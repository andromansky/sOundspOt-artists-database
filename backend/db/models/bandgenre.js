const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class BandGenre extends Model {
    static associate({ Band, Genre }) {
      BandGenre.Band = BandGenre.belongsTo(Band, {
        foreignKey: 'bandId',
      });

      BandGenre.Genre = BandGenre.belongsTo(Genre, {
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
    bandId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Bands',
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

  BandGenre.init(attributes, {
    sequelize,
    modelName: 'BandGenre',
    tableName: 'BandGenres',
  });
  return BandGenre;
};
