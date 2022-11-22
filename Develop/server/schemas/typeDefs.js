// import the gql tagged template function
const { gql } = require('apollo-server-express');
const { User, Book } = require('../models');

type Book {
  authors: String
  description: String 
  bookID: ID
  image: String
  link: String
  title: String 

}

type User {
  username: String
  email: String
  password: String
  savedBooks: [bookSchema]
}

// create our typeDefs
const typeDefs = gql`

type Query {
  users: [User]
  user(username: String!): User
  book(username: String): [Book]
  book(_id: ID!): Book
}

type Mutation {
  login(email: String!, password: String!): User
  addUser(username: String!, email: String!, password: String!): User
}
`;


// export the typeDefs
module.exports = typeDefs;