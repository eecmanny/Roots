const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class GrandChildren extends Model {}

GrandChildren.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    relative_to: {
      type: DataTypes.INTEGER,
      references: {
        model: 'children',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'grandchildren',
  }
);

module.exports = GrandChildren;
