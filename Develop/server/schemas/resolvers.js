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
        addUser: async (parent, args) => {
          const user = await User.create(args);
          const token = signToken(user);

          return { token, user };
        }, 
        login: async (parent, { username, email }) => {
          const user = await User.findOne({ email });

          if(!user) {
            throw new AuthenticationError('incorrect login');
          }

          const correctPass = await user.isCorrectPassword(password);

          if (!correctPass) {
            throw new AuthenticationError('incorrect login');
          }

          const token = signToken(user);
          return { token, user }l
        },
        addBook: async (parents, args, context) => {
          if(context.user){
            const thought = await Book.create({ ...args, username: context.user.username });

            await User.findByIdandUpdate(
              { _id: context.user.id },
              { $push: { book: book._id } },
              { new: true }
            );
            return book;
          }
          throw new AuthenticationError('incorrect login');
        },
        updateUser: async (parent, args, context) => {
          if(context.user) {
          const updatedUser = await User.findByIdAndUpdate(
            { _id: user._id }, 
            { $set: { 
                Username : username ? username : undefined,
                Email : email ? email : undefined, 
                Password : password ? password : undefined, 
              } },
            { new: true }
            );	
            return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in!");
      }, 
      }
  };
  
  module.exports = resolvers;