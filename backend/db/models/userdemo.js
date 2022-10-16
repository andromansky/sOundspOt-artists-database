const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserDemo extends Model {
    static associate({ User }) {
      UserDemo.User = UserDemo.belongsTo(User, {
        foreignKey: 'userId',
      });
    }
  }
  const attributes = {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    demoFile: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    demoTitle: {
      type: DataTypes.TEXT,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  };
  UserDemo.init(attributes, {
    sequelize,
    modelName: 'UserDemo',
    tableName: 'UserDemos',
  });
  return UserDemo;
};
