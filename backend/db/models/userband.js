const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserBand extends Model {
    static associate({ Band, User }) {
      UserBand.User = UserBand.belongsTo(User, {
        foreignKey: 'userId',
      });

      UserBand.Band = UserBand.belongsTo(Band, {
        foreignKey: 'bandId',
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
    bandId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Bands',
        key: 'id',
      },
    },
    status: {
      type: DataTypes.BOOLEAN,
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

  UserBand.init(attributes, {
    sequelize,
    modelName: 'UserBand',
    tableName: 'UserBands',
  });
  return UserBand;
};
