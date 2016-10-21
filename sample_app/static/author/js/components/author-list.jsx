import React from 'react';
import {BaseReactComponent} from '../shared.jsx';
import AuthorDispatcher from '../dispatcher.js';
import AuthorItem from './author-item.jsx';

//**********************************************************************
export default class AuthorList extends BaseReactComponent {
  //********************************************************************
  static propTypes = {
    authors: React.PropTypes.object.isRequired
  };

  //********************************************************************
  getBackboneCollections() {
    return [this.props.authors];
  }

  //********************************************************************
  refresh() {
    AuthorDispatcher.dispatch({actionType: "refresh-authors"});
  }

  //********************************************************************
  render() {
    return (
      <div>
        <ul className="authors collection">
          {this.props.authors.map((author, index) => {
            return (
              <AuthorItem
                author={author}
                key={index}
                expanded={author === this.props.authors.expanded}
              />
            );
          })}
        </ul>
        <a className="waves-effect btn refresh-button" onClick={this.refresh}>Refresh</a>
        <br/>
        {/* The image blow is just to demonstrate using Django template strings */}
        <img src='{% static "images/person-icon.png" %}'/>
      </div>
    );
  }
}
