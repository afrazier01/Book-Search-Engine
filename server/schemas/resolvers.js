const { User } = require('../models');
const Book = require('../models/Book');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, {userId}) => {
        console.log(`Requested User ID => `+userId)
      return User.findOne({ _id: userId })
      .select('-__v')
      .populate('savedBooks');
    },
    me: async (parent, args, context) => {
        if (context.user) {
          return User.findOne({ _id: context.user._id }).populate('savedBooks');
        }
        throw AuthenticationError;
      },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    saveBook: async (parent, {authors,bookId,title,link,image,description}, context) => {
        if (bookId) {
       return User.findOneAndUpdate(
          { _id: context.user._id },
          {$addToSet: {
            savedBooks: {authors: authors,bookId,title,link,image,description}
            }},
          {new: true}
        ); 
      }
      throw AuthenticationError;
      ('You need to be logged in!');
    },
    removeBook: async (parent, { bookId }, context) => {
        if (bookId) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          { 
            $pull: { 
                savedBooks: {
                    bookId: bookId 
            } } },
            {new: true}
        );
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
