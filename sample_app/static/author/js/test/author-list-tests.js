"use strict";

import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

import AuthorList from "../components/author-list.jsx";
import {AuthorStore} from '../models.js';
import AuthorItem from "../components/author-item";
import AuthorDispatcher from '../dispatcher.js';

//**********************************************************************
describe('AuthorList', () => {
  var component = (<AuthorList authors={AuthorStore}/>);
  var dispatcherSpy;
  var fixture = [
    {id: 1, first_name: "Amy", last_name: "Barnes", description: "one"},
    {id: 2, first_name: "Betty", last_name: "Cates", description: "two"},
    {id: 3, first_name: "Cathy", last_name: "Dean", description: "three"},
  ];

  //********************************************************************
  beforeEach(function() {
    AuthorStore.reset(fixture);
    AuthorStore.expanded = null;
    expect(AuthorStore.expanded).to.equal(null);
    dispatcherSpy = sinon.spy(AuthorDispatcher, 'dispatch');
  });

  //********************************************************************
  afterEach(function() {
    dispatcherSpy.restore();
  });

  //********************************************************************
  it('wraps the AuthorItems', function() {
    let wrapper = shallow(component);
    expect(wrapper.type()).to.equal('div');
    let ul = wrapper.childAt(0);
    expect(ul.type()).to.equal('ul');
    expect(ul.hasClass('authors')).to.equal(true);
    expect(ul.hasClass('collection')).to.equal(true);
    expect(ul.children().length).to.equal(3);  // 3 AuthorItems included
    let x = ul.childAt(0);
    expect(x.type()).to.equal(AuthorItem);
  });

  //********************************************************************
  it('can refresh', function() {
    let wrapper = shallow(component);
    wrapper.find('.refresh-button').simulate('click');
    expect(dispatcherSpy.called).to.equal(true);
    expect(dispatcherSpy.getCall(0).args[0].actionType).to.equal('refresh-authors');
  });
});
