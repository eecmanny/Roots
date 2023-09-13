const sequelize = require('../config/connection');
const { User, Childern } = require('../models');

const userData = require('./userData.json');
const projectData = require('./ChildernData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const childern of ChildernData) {
    await Childern.create({
      ...childern,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
