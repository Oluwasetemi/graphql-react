import React, {Component} from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import {GET_ALL_BOOKS} from './BookList'

const GET_ALL_AUTHORS = gql`
  query GET_ALL_AUTHORS {
    authors {
      id
      name
    }
  }
`;

const CREATE_BOOK = gql`
  mutation CREATE_BOOK ($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      id
    }
  }
`;


const Label = styled.label`
  text-transform: uppercase;
  padding: 5px;
  input {
    display: block;
  }
  select {
    display: block;
    font-family: Cursive;
    padding: 5px;
  }
`;

const ButtonStyles = styled.button`
  padding: .5em;
  margin-left: 25px;
  border: 1px solid red;
  border-radius: 5px;
  outline-style: double;
  outline-width: 1px;
  outline-color: rgba(255, 0, 0, .3);
  margin-top: 10px;
  outline-offset: 2px;
  color: red;
  background-color: #ffffff20;
  :hover {
    outline: none;
    color: white;
    background-color: red;
    transition: 2s all;
  }
`;

class CreateBook extends Component {
  state = {
    name: '',
    genre: '',
    authorId: '',
  }

  handleChange= e => {
    const {id, value} = e.target;
    console.log({value, id})

    this.setState({
      [id]: value,
    })
  }
  render() {
    return (
      <div className="create-book">
      <Mutation
        mutation={CREATE_BOOK}
        variables={this.state}
        refetchQueries={[
          {query : GET_ALL_BOOKS}
        ]}
      >
      {(addBook, {data, loading}) => (
        <form onSubmit={async e => {
          e.preventDefault();
          const res = await addBook();
          this.setState({
            name: '',
            genre: '',
            authorId: '',
          });
          // console.log(data);
          // console.log(res);
          alert(`${res.data.addBook.name } was saved`)
        }}>
          <Label htmlFor="name">
          Book Name
          <input type="text" id="name" placeholder="Enter a Book Name" value={this.state.name} onChange={this.handleChange} />
          </Label>

          <Label htmlFor="genre">
          Genre
          <input type="text" id="genre" placeholder="Enter a Book Genre" value={this.state.genre} onChange={this.handleChange} />
          </Label>

          <Label htmlFor="author">
          Author
          <Query query={GET_ALL_AUTHORS}>
            {({error, loading, data}) =>{
              if(error) return <p>Error </p>
              if(loading)return <p>Loading an Author</p>
              return (
                <select onChange={this.handleChange} id="authorId">
                  {data.authors.map((author) => <option key={author.id} value={author.id}>{author.name}</option>)}
                </select>
              )
            }}
          </Query>
          </Label>
          <ButtonStyles type="submit">Submit</ButtonStyles>
        </form>
      )}
      </Mutation>
      </div>
    )
  }
}

export default CreateBook;
export { GET_ALL_AUTHORS, ButtonStyles };
