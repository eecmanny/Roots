const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Relationship extends Model { }

Relationship.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    relationship: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    relationship_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      foreignkey: true,
      autoIncrement: true,
    },

  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'initialUser',
  }
);

module.exports = Relationship;
