const { User, Book } = require('../models');

const resolvers = {
    Query: {
      books: async () => {
        return Book.find().sort({ title: -1 });
      }
    }
  };
  
  module.exports = resolvers;