import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';

import BookList from './components/BookList';
import CreateBook from './components/CreateBook';
import UpdateBook from './components/UpdateBook';
import DeleteBook from './components/DeleteBook';

import './index.css'

const client = new ApolloClient({
  uri: 'http://localhost:9999/graphql',
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <BookList />
          <CreateBook />
          <UpdateBook />
          <DeleteBook />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
