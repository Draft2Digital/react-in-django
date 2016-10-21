import React from 'react';
import {BaseReactComponent} from '../shared.jsx';
import AuthorDispatcher from '../dispatcher.js';
import {AuthorModel} from '../models.js';

//**********************************************************************
export default class AuthorItem extends BaseReactComponent {
  //******************************************************************
  static propTypes = {
    expanded: React.PropTypes.bool,
    author: React.PropTypes.instanceOf(AuthorModel).isRequired
  };

  //******************************************************************
  static defaultProps = {
    expanded: false
  };

  //******************************************************************
  static getStyles() {
    return {
      img: {
        paddingLeft: '5px',
        paddingRight: '10px'
      },
      authorItem: {
        // border: 'solid'
      },
      deleteButton: {
        backgroundColor: 'red',
        color: 'blue'
      },
      expandedAuthor: {
        display: 'inline-block'
      }
    };
  }

  //******************************************************************
  handleDeleteAuthor = () => {
    AuthorDispatcher.dispatch({actionType: "delete-author", authorId: this.props.author.id});
  };

  //******************************************************************
  handleExpandAuthor = () => {
    console.log("handleExpandAuthor");
    AuthorDispatcher.dispatch({actionType: "expand-author", author: this.props.author});
  };

  //******************************************************************
  render() {
    let styles = AuthorItem.getStyles();
    let innerChunk = null;
    if (this.props.expanded) {
      innerChunk = (
        <ul className="collection" style={styles.expandedAuthor}>
          <li className="collection-item"><strong>ID:</strong>{this.props.author.get('id')}</li>
          <li className="collection-item"><strong>First
            Name:</strong>{this.props.author.get('first_name')}</li>
          <li className="collection-item"><strong>Last
            Name:</strong>{this.props.author.get('last_name')}</li>
          <li className="collection-item">
            <strong>Description:</strong>{this.props.author.get('description')}</li>
        </ul>
      );
    }
    else {
      innerChunk = (
        <span>
                    <i className="material-icons left">account_circle</i>
          {this.props.author.getDisplayName()}
                </span>
      );
    }
    return (
      <li className="collection-item author-item" style={styles.authorItem}
          onClick={this.handleExpandAuthor}>
        {innerChunk}
        <i onClick={this.handleDeleteAuthor} className="delete-link material-icons small right">delete</i>
      </li>
    );
  }
}
