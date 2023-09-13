const User = require('./User');
const Childern = require('./Childern');

User.hasMany(Childern, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Childern.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Childern };
