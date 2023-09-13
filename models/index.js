const User = require('./User');
const Childern = require('./Children');

User.hasMany(Childern, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Childern.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Childern };
