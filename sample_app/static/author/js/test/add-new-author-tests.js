"use strict";

import React from 'react';
import Backbone from 'backbone';
import {mount, shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';

import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';

chai.use(chaiEnzyme());
import {expect} from 'chai';

import {AuthorStore} from '../models';
import AddNewAuthor from '../components/add-new-author';

//**********************************************************************
beforeEach(() => {
  AuthorStore.reset();
  expect(AuthorStore.expanded).to.equal(null);
});


//**********************************************************************
function getComponent() {
  return (
    <AddNewAuthor/>
  );
}

//**********************************************************************
describe('AuthorList', () => {
  //******************************************************************
  it('starts off showing an Add New Author button', () => {
    let component = getComponent();
    let wrapper = shallow(component);
    expect(wrapper).to.exist;
    expect(wrapper.type()).to.equal('div');
    let button = wrapper.childAt(0);
    expect(button.type()).to.equal('a');
    expect(button.hasClass('btn')).to.equal(true);
    expect(button.text()).to.equal('Add New Author');
  });
});
