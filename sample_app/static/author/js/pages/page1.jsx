import React from 'react';
import ReactDOM from 'react-dom';
import {AuthorStore} from '../models.js';
import {AuthorList} from "../components.jsx";
import AddNewAuthor from "../components/add-new-author.jsx";
import AuthorDispatcher from '../dispatcher.js';

console.log("page1 loading...");

AuthorDispatcher.dispatch({actionType: "refresh-authors"});

//**********************************************************************
function main() {
    console.log("page1 loaded");
    // Just showing that you can have multiple top-level react components
    ReactDOM.render(<AddNewAuthor/>, document.getElementById('add-new-author'));
    ReactDOM.render(<AuthorList authors={AuthorStore}/>, document.getElementById('authors'));
}

//**********************************************************************
$(document).ready(function() {
    main();
});
