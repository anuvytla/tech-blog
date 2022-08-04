const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class User extends Model {}

User.init(
    {
        // define columns
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        hashed_password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
    }
);

module.exports = User;