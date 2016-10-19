"use strict";

import React from 'react';
import {mount, shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';

import {expect} from 'chai';

import AuthorList from "../components/author-list.jsx";
import {AuthorStore} from '../models.js';
import AuthorItem from "../components/author-item";

//**********************************************************************
beforeEach(() => {
  let fixture = [
    {id: 1, first_name: "Amy", last_name: "Barnes", description: "one"},
    {id: 2, first_name: "Betty", last_name: "Cates", description: "two"},
    {id: 3, first_name: "Cathy", last_name: "Dean", description: "three"},
  ];
  AuthorStore.reset(fixture);
  expect(AuthorStore.expanded).to.equal(null);
});

//**********************************************************************
function getComponent() {
  return (
    <AuthorList authors={AuthorStore}/>
  );
}

//**********************************************************************
describe('AuthorList', () => {
  //******************************************************************
  it('wraps the AuthorItems', () => {
    let component = getComponent();
    let wrapper = shallow(component);
    expect(wrapper).to.exist;
    expect(wrapper.type()).to.equal('div');
    let ul = wrapper.childAt(0);
    expect(ul.type()).to.equal('ul');
    expect(ul.hasClass('authors')).to.equal(true);
    expect(ul.hasClass('collection')).to.equal(true);
    expect(ul.children().length).to.equal(3);  // 3 AuthorItems included
    let x = ul.childAt(0);
    expect(x.type()).to.equal(AuthorItem);

    /*
    let tree = shallowToJson(wrapper);
    expect(tree).toMatchSnapshot();
    */
  });
});
