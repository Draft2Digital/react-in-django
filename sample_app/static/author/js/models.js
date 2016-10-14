import Backbone from 'backbone';
import AuthorDispatcher from './dispatcher.js';
import {get_config} from './shared.jsx';

//**********************************************************************
export class AuthorModel extends Backbone.Model {
    //******************************************************************
    defaults() {
        return {
            id: null,
            first_name: '',
            last_name: '',
            description: ''
        };
    }

    //******************************************************************
    getDisplayName() {
        return this.get('first_name') + " " + this.get('last_name');
    }
}

//**********************************************************************
function success(collection, response, options) {
    console.log("success");
    console.log(collection);
    console.log(response);
    console.log(options);
}

//**********************************************************************
function error(collection, response, options) {
    console.log("error");
    console.log(collection);
    console.log(response);
    console.log(options);
}

//**********************************************************************
export class AuthorCollection extends Backbone.Collection {
    model = AuthorModel;
    url = "/sample-app/authors";
    dispatchToken = null;
    // I _could_ make a separate AuthorList Model to manage this one variable,
    // but since it isn't synced with the server at all I... didn't.
    expanded = null;

    //******************************************************************
    dispatchCallback = (payload) => {
        switch (payload.actionType) {
            case "add-new-author":
                console.log("Adding Author triggered");
                // console.log(payload.author);
                this.create(payload.author); // TODO - Add callback methods
                break;
            case "delete-author":
                console.log("deleting author triggered: " + payload.authorId);
                let author = this.findWhere({id: payload.authorId});
                if (author) {
                    author.destroy(); // TODO - Add callback methods
                }
                break;
            case "expand-author":
                console.log("expand author triggered");
                // console.log(payload.author);
                if (this.expanded === payload.author) {
                    // collapse
                    this.expanded = null;
                }
                else {
                    // expand
                    this.expanded = payload.author;
                }
                this.trigger("change");
                break;
            case "refresh-authors":
                console.log("refresh authors triggered");
                this.fetch({success: success, error: error});
                break;
        }
    };
}

export const AuthorStore = new AuthorCollection();
AuthorStore.dispatchToken = AuthorDispatcher.register(AuthorStore.dispatchCallback);
