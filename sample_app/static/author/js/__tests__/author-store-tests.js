"use strict";

import React from 'react';
import {AuthorStore, AuthorModel} from '../models.js';

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
describe('AuthorStore', () => {
    //******************************************************************
    test('can expand author', () => {
        let betty = AuthorStore.findWhere({id: 2});
        expect(betty.get('first_name')).toBe("Betty");
        let payload = {actionType: "expand-author", author: betty};
        AuthorStore.dispatchCallback(payload);
        expect(AuthorStore.expanded).toBe(betty);

        // call it a second time to re-collapse
        AuthorStore.dispatchCallback(payload);
        expect(AuthorStore.expanded).toBe(null);
    });

    //******************************************************************
    test('can delete author', () => {
        let betty = AuthorStore.findWhere({id: 2});
        expect(betty.get('first_name')).toBe("Betty");

        expect(AuthorStore.length).toBe(3);
        let payload = {actionType: "delete-author", authorId: 2};
        AuthorStore.dispatchCallback(payload);
        expect(AuthorStore.length).toBe(2);

        // calling it a second time should be a no-op
        AuthorStore.dispatchCallback(payload);
        expect(AuthorStore.length).toBe(2);
    });

    //******************************************************************
    test('can add author', () => {
        let larryData = {id: 5, first_name: "Larry", last_name: "Moppet", description: "additional"};
        let larry = new AuthorModel(larryData);
        expect(larry.get('last_name')).toBe("Moppet");
        let payload = {actionType: "add-new-author", author: larry};
        AuthorStore.dispatchCallback(payload);
        expect(AuthorStore.length).toBe(4);
        expect(AuthorStore.findWhere({id: 5})).toBe(larry);
    });
});
