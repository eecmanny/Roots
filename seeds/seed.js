const sequelize = require('../config/connection');
const { User, Children } = require('../models');

const userData = require('./userData.json');
const childData = require('./childData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

const seedChildDatabase = async () => {
  await sequelize.sync({ force: true });

  const children = await Children.bulkCreate(childData, {
    individualHooks: true,
    returning: true,
  });

  // for (const Childern of treeData) {
  //   await Childern.create({
  //     ...Childern,
  //     user_id: users[Math.floor(Math.random() * users.length)].id,
  //   });
  // }

  process.exit(0);
};

seedChildDatabase();
seedDatabase();
