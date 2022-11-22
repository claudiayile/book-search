const userSeeds = require('./userSeed.json');
const bookSeeds = require('./bookSeed.json');
const db = require('../config/connection');
const { Book, User } = require('../models');

db.once('open', async () => {
  try {
    await Book.deleteMany({});
    await User.deleteMany({});

    await Book.create(bookSeeds);

    for (let i = 0; i < bookSeeds.length; i++) {
      const { _id, thoughtAuthor } = await Thought.create(thoughtSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: thoughtAuthor },
        {
          $addToSet: {
            thoughts: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});