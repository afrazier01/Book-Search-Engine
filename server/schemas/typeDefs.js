const typeDefs = `
    input SaveBookInput { 
        bookAuthors: [String]
        description: String
        title: String
        bookId: Int
        image: String
        link: String
    }

  type User {
    _id: ID
    username: String
    email: String
    password: String
    bookCount: Int
    savedBooks: [Book]!  
  }

  type Book {
    _id: ID
    authors: String
    description: String
    bookId: String!
    image: String
    link: String
    title: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(input: SaveBookInput!): User
    removeBook(bookId: String!): User
  }
`;

module.exports = typeDefs;
