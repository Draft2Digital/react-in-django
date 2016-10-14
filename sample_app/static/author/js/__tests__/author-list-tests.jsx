"use strict";

import React from 'react';
import { mount, shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import AuthorList from "../components/author-list.jsx";
import {AuthorStore} from '../models.js';

//**********************************************************************
beforeEach(() => {
    let fixture = [
        {id: 1, first_name: "Amy", last_name: "Barnes", description: "one"},
        {id: 2, first_name: "Betty", last_name: "Cates", description: "two"},
        {id: 3, first_name: "Cathy", last_name: "Dean", description: "three"},
    ];
    AuthorStore.reset(fixture);
    expect(AuthorStore.expanded).toBe(null);
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
    test('author item changes when expanded', () => {
        let component = getComponent();
        let wrapper = shallow(component);
        let getById = (id) => wrapper.find('AuthorItem').findWhere(authorItem => authorItem.props().author.get('id') === id);
        expect(getById(3).props().author.get('first_name')).toBe('Cathy');
        expect(getById(1).props().expanded).toBe(false);
        expect(getById(2).props().expanded).toBe(false);
        expect(getById(3).props().expanded).toBe(false);
        let tree = shallowToJson(wrapper);
        expect(tree).toMatchSnapshot();

        expect(AuthorStore.expanded).toBe(null);
        getById(2).shallow().find('.author-item').simulate('click');
        expect(AuthorStore.expanded).not.toBe(null);
        let betty = AuthorStore.findWhere({id: 2});
        expect(AuthorStore.expanded).toBe(betty);

        wrapper = shallow(component);
        expect(getById(1).props().expanded).toBe(false);
        expect(getById(2).props().expanded).toBe(true);
        expect(getById(3).props().expanded).toBe(false);

        tree = shallowToJson(wrapper);
        expect(tree).toMatchSnapshot();
    });
});
