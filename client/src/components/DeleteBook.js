import React, {Component} from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import {GET_ALL_BOOKS} from './BookList'

const DELETE_BOOK = gql`
  mutation DELETE_BOOK($id: ID!) {
    deleteBook (id: $id) {
      name
    }
  }
`;

class DeleteBook extends Component {
  update = (cache, payload) => {
    // manually update the cache on the client, so it matches the server
    // 1. Read the cache for the items we want
    const data = cache.readQuery({ query: GET_ALL_BOOKS });
    console.log(data, payload);
    // 2. Filter the deleted itemout of the page
    data.books = data.books.filter(book => book.name !== payload.data.deleteBook.name);
    // 3. Put the items back!
    cache.writeQuery({ query: GET_ALL_BOOKS, data });
  };

  render() {
    return (
      <div className="delete-book">
      <Mutation
        mutation={DELETE_BOOK}
        variables={{id: this.props.id}}
        refetchQueries={[
          {query : GET_ALL_BOOKS}
        ]}
        update={this.update}
      >
        {(deleteBook, {error}) => (
          <button onClick={
            () => {
              // eslint-disable-next-line no-restricted-globals
              if (confirm('Do you want to delete this book?')) {
                deleteBook().catch(err => alert(`${err}: ${error} while trying to delete Book`))
              }
            }
          }>✂✂ {this.props.id}</button>

        )}
      </Mutation>
      </div>
    )
  }
}

export default DeleteBook;