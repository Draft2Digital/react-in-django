"use strict";

import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

import AddNewAuthor from '../components/add-new-author';
import AuthorDispatcher from '../dispatcher.js';

//**********************************************************************
describe('AddNewAuthor', function() {
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
  it('starts off showing an Add New Author button', () => {
    let component = (<AddNewAuthor/>);
    let wrapper = shallow(component);
    expect(wrapper.type()).to.equal('div');
    let button = wrapper.childAt(0);
    expect(button.type()).to.equal('a');
    expect(button.hasClass('btn')).to.equal(true);
    expect(button.text()).to.equal('Add New Author');
    expect(wrapper.state().isFormDisplayed).to.equal(false);
  });

  //********************************************************************
  function getClickedComponent() {
    let component = (<AddNewAuthor/>);
    let wrapper = shallow(component);
    let button = wrapper.childAt(0);
    button.simulate('click');
    return [component, wrapper, button];
  }

  //********************************************************************
  it('shows an Add New Author form if you click the button', () => {
    let [component, wrapper, button] = getClickedComponent();
    expect(wrapper.state().isFormDisplayed).to.equal(true);
    expect(wrapper.children().length).to.equal(4);
    let firstName = wrapper.childAt(0);
    expect(firstName.type()).to.equal('input');
  });

  //********************************************************************
  it('typing in the firstName input field changes the state', () => {
    let [component, wrapper, button] = getClickedComponent();

    let firstName = wrapper.find(".first-name");
    firstName.simulate('change', {target: {value: 'Larry'}});
    expect(wrapper.state().author.get('first_name')).to.equal("Larry");
  });

  //********************************************************************
  it('typing in the lastName input field changes the state', () => {
    let [component, wrapper, button] = getClickedComponent();

    let lastName = wrapper.find(".last-name");
    lastName.simulate('change', {target: {value: 'Jones'}});
    expect(wrapper.state().author.get('last_name')).to.equal("Jones");
  });

  //********************************************************************
  it('typing in the description input field changes the state', () => {
    let [component, wrapper, button] = getClickedComponent();
    let description = wrapper.find(".description");
    description.simulate('change', {target: {value: 'some description'}});
    expect(wrapper.state().author.get('description')).to.equal("some description");
  });

  //********************************************************************
  it('can submit the new author', () => {
    let [component, wrapper, button] = getClickedComponent();
    let state = wrapper.state();
    state.author.set('first_name', 'Larry');
    state.author.set('last_name', 'Jones');
    state.author.set('description', 'some description');
    wrapper.setState(state);

    button = wrapper.find('.submit-button');
    button.simulate('click');
    expect(dispatcherSpy.called).to.equal(true);
    expect(dispatcherSpy.getCall(0).args[0].actionType).to.equal('add-new-author');
    expect(dispatcherSpy.getCall(0).args[0].author).to.equal(state.author);
  });
});
