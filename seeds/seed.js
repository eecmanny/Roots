const sequelize = require('../config/connection');
const { User, Children, GrandChildren } = require('../models');

const userData = require('./userData.json');
const childData = require('./childData.json');
const grandchildData = require('./grandchildData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // process.exit(0);
};

const seedChildDatabase = async () => {
  await sequelize.sync({ force: false });

  const children = await Children.bulkCreate(childData, {
    individualHooks: true,
    returning: true,
  });

};

const seedgrandChildDatabase = async () => {
  await sequelize.sync({ force: false });

  const grandChildren = await GrandChildren.bulkCreate(grandchildData, {
    individualHooks: true, returning: true,
  });
  console.log(grandChildren);
};

const seedJSON = async () => {
  await seedDatabase();
  await seedChildDatabase();
  await seedgrandChildDatabase();

  process.exit(0);
};

seedJSON();


