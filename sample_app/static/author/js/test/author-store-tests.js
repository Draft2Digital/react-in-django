"use strict";

import React from 'react';
import {AuthorStore, AuthorModel} from '../models.js';
import AuthorDispatcher from '../dispatcher.js';

import {expect} from 'chai';
import sinon from 'sinon';

//**********************************************************************
describe('AuthorStore', function() {
  var xhr;
  var server;
  var dispatcherSpy;
  var fixture = [
    {"id": 1, "first_name": "Amy", "last_name": "Barnes", "description": "one"},
    {"id": 2, "first_name": "Betty", "last_name": "Cates", "description": "two"},
    {"id": 3, "first_name": "Cathy", "last_name": "Dean", "description": "three"}
  ];

  //********************************************************************
  beforeEach(function() {
    dispatcherSpy = sinon.spy(AuthorDispatcher, 'dispatch');
    xhr = sinon.useFakeXMLHttpRequest();
    window.XMLHttpRequest = xhr;
    server = sinon.fakeServer.create();
    AuthorStore.reset(fixture);
  });

  //********************************************************************
  afterEach(function() {
    xhr.restore();
    server.restore();
    dispatcherSpy.restore();
  });

  //********************************************************************
  function getListValidResponse() {
    return [
      200,
      { "Content-Type": "application/json" },
      JSON.stringify(fixture)];
  }

  //********************************************************************
  function getAddValidResponse() {
    return [
      200,
      { "Content-Type": "application/json" },
      `{"id": 5}`
    ];
  }

  //********************************************************************
  function getAddInvalidResponse() {
    return [403, { "Content-Type": "text/plain" }, 'denied'];
  }

  //********************************************************************
  it('can expand author', function() {
    let betty = AuthorStore.findWhere({id: 2});
    expect(betty.get('first_name')).to.equal("Betty");
    let payload = {actionType: "expand-author", author: betty};
    AuthorStore.dispatchCallback(payload);
    expect(AuthorStore.expanded).to.equal(betty);

    // call it a second time to re-collapse
    AuthorStore.dispatchCallback(payload);
    expect(AuthorStore.expanded).to.equal(null);
  });

  //********************************************************************
  it('can delete author', function() {
    let betty = AuthorStore.findWhere({id: 2});
    expect(betty.get('first_name')).to.equal("Betty");

    expect(AuthorStore.length).to.equal(3);
    let payload = {actionType: "delete-author", authorId: 2};
    AuthorDispatcher.dispatch(payload);
    expect(AuthorStore.length).to.equal(2);

    // calling it a second time should be a no-op
    AuthorStore.dispatchCallback(payload);
    expect(AuthorStore.length).to.equal(2);
    expect(dispatcherSpy.called).to.equal(true);
  });

  //********************************************************************
  it('can add author', function() {
    let larryData = {
      id: null, first_name: "Larry",
      last_name: "Moppet", description: "additional"
    };
    let larry = new AuthorModel(larryData);
    expect(larry.get('id')).to.equal(null);
    expect(larry.get('last_name')).to.equal("Moppet");
    let payload = {actionType: "add-new-author", author: larry};
    AuthorDispatcher.dispatch(payload);
    expect(server.requests.length).to.equal(1);
    expect(larry.get('id')).to.equal(null);
    server.requests[0].respond(...getAddValidResponse());
    // The id should have been successfully set to 5
    expect(larry.get('id')).to.equal(5);
    expect(AuthorStore.length).to.equal(4);
    expect(AuthorStore.findWhere({id: 5})).to.equal(larry);
    expect(dispatcherSpy.called).to.equal(true);
  });

  //********************************************************************
  it('rejects author if failure on server', function() {
    let larryData = {
      id: null, first_name: "Larry",
      last_name: "Moppet", description: "additional"
    };
    let larry = new AuthorModel(larryData);
    expect(larry.get('id')).to.equal(null);
    expect(larry.get('last_name')).to.equal("Moppet");
    let payload = {actionType: "add-new-author", author: larry};
    AuthorDispatcher.dispatch(payload);
    expect(server.requests.length).to.equal(1);
    expect(larry.get('id')).to.equal(null);
    server.requests[0].respond(...getAddInvalidResponse());
    // The id should have been successfully set to 5
    expect(larry.get('id')).to.equal(null);
    expect(AuthorStore.length).to.equal(3);
    expect(dispatcherSpy.called).to.equal(true);
  });

  //********************************************************************
  it('can refresh the author list', function() {
    AuthorStore.reset();
    let payload = {actionType: "refresh-authors"};
    AuthorDispatcher.dispatch(payload);
    expect(server.requests.length).to.equal(1);
    server.requests[0].respond(...getListValidResponse());
    expect(AuthorStore.length).to.equal(3);
    expect(dispatcherSpy.called).to.equal(true);
  });
});
