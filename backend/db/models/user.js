const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({
      Band, Rating, UserBand, UserDemo, UserInstrument, UserGenre,
    }) {
      User.SourceUser = User.hasMany(Rating, {
        foreignKey: 'userSourceId',
      });

      User.TargetUser = User.hasMany(Rating, {
        foreignKey: 'userTargetId',
      });

      User.Instrument = User.hasMany(UserInstrument, {
        foreignKey: 'userId',
      });

      User.Demo = User.hasMany(UserDemo, {
        foreignKey: 'userId',
      });

      User.UserBand = User.hasMany(UserBand, {
        foreignKey: 'userId',
      });

      User.Band = User.hasMany(Band, {
        foreignKey: 'createrId',
      });

      User.Genre = User.hasMany(UserGenre, {
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
    login: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    about: {
      type: DataTypes.TEXT,
    },
    latitude: {
      type: DataTypes.FLOAT,
    },
    longitude: {
      type: DataTypes.FLOAT,
    },
    contact: {
      type: DataTypes.TEXT,
    },
    photo: {
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

  User.init(attributes, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
  });
  return User;
};
