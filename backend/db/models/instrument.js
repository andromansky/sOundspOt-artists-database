const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Instrument extends Model {
    static associate({ UserInstrument }) {
      Instrument.User = UserInstrument.hasMany(UserInstrument, {
        foreignKey: 'instrumentId',
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
    instrument: {
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

  Instrument.init(attributes, {
    sequelize,
    modelName: 'Instrument',
    tableName: 'Instruments',
  });
  return Instrument;
};
