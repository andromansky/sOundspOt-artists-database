const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SpotPhoto extends Model {
    static associate({ Spot }) {
      SpotPhoto.Spot = SpotPhoto.belongsTo(Spot, {
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
    photo: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Spots',
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

  SpotPhoto.init(attributes, {
    sequelize,
    modelName: 'SpotPhoto',
    tableName: 'SpotPhotos',
  });
  return SpotPhoto;
};
