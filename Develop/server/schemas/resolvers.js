const { User, Book } = require('../models');

const resolvers = {
    Query: {
        books: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Book.find(params).sort({ title: -1 });
          },
    },
    book: async (parent, { _id }) => {
        return Thought.findOne({ _id });
      }, 
    users: async () => {
        return User.find()
          .select('-__v -password')
          .populate('books');
      },
      user: async (parent, { username }) => {
        return User.findOne({ username })
          .select('-__v -password')
          .populate('books');
      },

      Mutation: {
        addUser: async () => {
          
        }
      }
  };
  
  module.exports = resolvers;