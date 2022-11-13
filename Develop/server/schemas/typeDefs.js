// import the gql tagged template function
const { gql } = require('apollo-server-express');

type Book {
  authors: String
  description: String 
  bookID: ID
  image: String
  link: String
  title: String 

}

// create our typeDefs
const typeDefs = gql`
type Query {
  books(username: String): [Book]
}
`;

// export the typeDefs
module.exports = typeDefs;