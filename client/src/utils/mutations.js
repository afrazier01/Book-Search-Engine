import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
//edit
export const SAVE_BOOK = gql`
  mutation saveBook($input: SaveBookInput!) {
    saveBook(input: $input) {
      username
      email
      _id
      bookCount
      savedBooks {
        _id
        authors
        bookId
        description
        image
        link
        title
      }
    }
  }`;

//edit
export const REMOVE_BOOK = gql`
mutation removeBook($bookId: String!, $userId: ID!) {
    removeBook(bookId: $bookId, userId: $userId) {
      _id
      bookCount
      email
      password
      username
      savedBooks {
        _id
        authors
        bookId
        description
        link
        title
        image
      }
    }
  }
`;

