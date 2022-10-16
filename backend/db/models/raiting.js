const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
    static associate({ User }) {
      Rating.UserSource = Rating.belongsTo(User, {
        foreignKey: 'userSourceId',
      });

      Rating.UserTarget = Rating.belongsTo(User, {
        foreignKey: 'userTargetId',
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
    userSourceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    userTargetId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
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

  Rating.init(attributes, {
    sequelize,
    modelName: 'Rating',
    tableName: 'Ratings',
  });
  return Rating;
};
