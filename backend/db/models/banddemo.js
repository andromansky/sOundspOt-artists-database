const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class BandDemo extends Model {
    static associate({ Band }) {
      BandDemo.Band = BandDemo.belongsTo(Band, {
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
    bandId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Bands',
        key: 'id',
      },
    },
    demoFile: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    songTitle: {
      type: DataTypes.TEXT,
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

  BandDemo.init(attributes, {
    sequelize,
    modelName: 'BandDemo',
    tableName: 'BandDemos',
  });
  return BandDemo;
};
