const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserGenre extends Model {
    static associate({ User, Genre }) {
      UserGenre.User = UserGenre.belongsTo(User, {
        foreignKey: 'userId',
      });

      UserGenre.Genre = UserGenre.belongsTo(Genre, {
        foreignKey: 'genreId',
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
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    genreId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Genres',
        key: 'id',
      },
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

  UserGenre.init(attributes, {
    sequelize,
    modelName: 'UserGenre',
    tableName: 'UserGenres',
  });
  return UserGenre;
};
