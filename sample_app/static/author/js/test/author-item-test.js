"use strict";

import React from 'react';
import {mount, shallow} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

import {AuthorModel} from '../models.js';
import AuthorDispatcher from '../dispatcher.js';
import AuthorItem from "../components/author-item.jsx";

//**********************************************************************
describe('AuthorItem', () => {
  var dispatcherSpy;

  //********************************************************************
  beforeEach(function() {
    dispatcherSpy = sinon.spy(AuthorDispatcher, 'dispatch');
  });

  //********************************************************************
  afterEach(function() {
    dispatcherSpy.restore();
  });

  //********************************************************************
  function getComponent() {
    let attributes = {id: 1, first_name: "Amy", last_name: "Barnes", description: "one"};
    let author = new AuthorModel(attributes);
    let component = (<AuthorItem expanded={false} author={author}/>);
    return component;
  }

  //********************************************************************
  it('can delete', function() {
    let component = getComponent();
    console.log(`component: ${component}`);
    let wrapper = mount(component);
    console.log(`wrapper: ${wrapper}`);
    expect(wrapper.props().expanded).to.equal(false);
    let deleteLink = wrapper.find(".delete-link");
    deleteLink.simulate("click");
    expect(dispatcherSpy.called).to.equal(true);
    let args = dispatcherSpy.getCall(0).args[0];
    expect(args.actionType).to.equal('delete-author');
    expect(args.authorId).to.equal(1);
  });
});
