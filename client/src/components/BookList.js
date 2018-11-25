import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const GET_ALL_BOOKS = gql`
  query GET_ALL_BOOKS {
    books {
      name
      id
      genre
    }
  }
`;

class BookList extends Component {
  render() {
    return (
      <div className="book-list">
        <Query query={GET_ALL_BOOKS}>
          {({error, loading, data}) => {
            if (error) return <p>Error</p>
            if (loading) return <p>Loading</p>
            return (
              <ul>
                {data.books.map((book) => <li key={book.id}>{book.name}</li>)}
              </ul>
            )
          }}
        </Query>
      </div>
    )
  }
}

export default BookList;