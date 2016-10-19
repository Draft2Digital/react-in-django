"use strict";

import React from 'react';
import {AuthorStore, AuthorModel} from '../models.js';

import {expect} from 'chai';
import sinon from 'sinon';

//**********************************************************************
describe('AuthorStore', function() {
  var xhr;
  var server;
  var fixture = [
    {"id": 1, "first_name": "Amy", "last_name": "Barnes", "description": "one"},
    {"id": 2, "first_name": "Betty", "last_name": "Cates", "description": "two"},
    {"id": 3, "first_name": "Cathy", "last_name": "Dean", "description": "three"}
  ];

  //********************************************************************
  beforeEach(function() {
    xhr = sinon.useFakeXMLHttpRequest();
    window.XMLHttpRequest = xhr;
    server = sinon.fakeServer.create();
    AuthorStore.reset(fixture);
  });

  //********************************************************************
  afterEach(function() {
    xhr.restore();
    server.restore();
  });

  //********************************************************************
  function getListValidResponse() {
    return [200, { "Content-Type": "application/json" },
        `[
          {"id": 1, "first_name": "Amy", "last_name": "Barnes", "description": "one"},
          {"id": 2, "first_name": "Betty", "last_name": "Cates", "description": "two"},
          {"id": 3, "first_name": "Cathy", "last_name": "Dean", "description": "three"}
         ]`];
  }

  //********************************************************************
  function getListInvalidResponse() {
    return [404, { "Content-Type": "text/plain" }, 'not found'];
  }

  //********************************************************************
  it('can fetch', function() {
    AuthorStore.reset();
    expect(AuthorStore.length).to.equal(0);
    expect(server.requests.length).to.equal(0);
    AuthorStore.fetch();
    expect(server.requests.length).to.equal(1);
    server.requests[0].respond(...getListValidResponse());
    expect(AuthorStore.length).to.equal(3);
  });

  //********************************************************************
  it('can expand author', function() {
    console.log("Running 'can expand author'");
    let betty = AuthorStore.findWhere({id: 2});
    expect(betty.get('first_name')).to.equal("Betty");
    let payload = {actionType: "expand-author", author: betty};
    AuthorStore.dispatchCallback(payload);
    expect(AuthorStore.expanded).to.equal(betty);

    // call it a second time to re-collapse
    AuthorStore.dispatchCallback(payload);
    expect(AuthorStore.expanded).to.be.null;
  });

  //********************************************************************
  it('can delete author', function() {
    let betty = AuthorStore.findWhere({id: 2});
    expect(betty.get('first_name')).to.equal("Betty");

    expect(AuthorStore.length).to.equal(3);
    let payload = {actionType: "delete-author", authorId: 2};
    AuthorStore.dispatchCallback(payload);
    expect(AuthorStore.length).to.equal(2);

    // calling it a second time should be a no-op
    AuthorStore.dispatchCallback(payload);
    expect(AuthorStore.length).to.equal(2);
  });

  //********************************************************************
  it('can add author', function() {
    let larryData = {id: 5, first_name: "Larry", last_name: "Moppet", description: "additional"};
    let larry = new AuthorModel(larryData);
    expect(larry.get('last_name')).to.equal("Moppet");
    let payload = {actionType: "add-new-author", author: larry};
    AuthorStore.dispatchCallback(payload);
    expect(AuthorStore.length).to.equal(4);
    expect(AuthorStore.findWhere({id: 5})).to.equal(larry);
  });
});
