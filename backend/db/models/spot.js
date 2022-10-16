const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    static associate({ SpotPhoto }) {
      Spot.SpotPhoto = Spot.hasMany(SpotPhoto, {
        foreignKey: 'spotId',
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
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    contact: {
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

  Spot.init(attributes, {
    sequelize,
    modelName: 'Spot',
    tableName: 'Spots',
  });

  return Spot;
};
