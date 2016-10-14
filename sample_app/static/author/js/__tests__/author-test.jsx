"use strict";

import React from 'react';

import {AuthorList} from "../components.jsx";
import AddNewAuthor from "../components/add-new-author.jsx";
import {AuthorStore} from '../models.js';
import AuthorDispatcher from '../dispatcher.js';
import renderer from 'react-test-renderer';

describe('AuthorStore', () => {
  test('Link changes the class when hovered', () => {
    let fixture = [
      {id: 1, first_name: "Amy", last_name: "Barnes", description: "one"},
      {id: 2, first_name: "Betty", last_name: "Cates", description: "two"},
      {id: 3, first_name: "Cathy", last_name: "Dean", description: "three"},
    ];
    AuthorStore.reset(fixture);
    const component = renderer.create(
      <AuthorList authors={AuthorStore}/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    var betty = AuthorStore.findWhere({id: 2});
    var payload = {actionType: "expand-author", author: betty};
    AuthorStore.dispatchCallback(payload);
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    // // manually trigger the callback
    // tree.props.onMouseEnter();
    // // re-rendering
    // tree = component.toJSON();
    // expect(tree).toMatchSnapshot();
    //
    // // manually trigger the callback
    // tree.props.onMouseLeave();
    // // re-rendering
    // tree = component.toJSON();
    // expect(tree).toMatchSnapshot();
  });
});
