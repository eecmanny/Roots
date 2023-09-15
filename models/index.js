const User = require('./User');
const Children = require('./Children');
const GrandChildren = require('./GrandChildren');


User.hasMany(Children, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Children.belongsTo(User, {
  foreignKey: 'user_id'
});

Children.hasMany(GrandChildren, {
  foreignKey: 'children_id',
  onDelete: 'CASCADE'
});

GrandChildren.belongsTo(Children, {
  foreignKey: 'children_id'
});

module.exports = { User, Children, GrandChildren };
