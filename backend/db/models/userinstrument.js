const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserInstrument extends Model {
    static associate({ User, Instrument }) {
      UserInstrument.User = UserInstrument.belongsTo(User, {
        foreignKey: 'userId',
      });
      UserInstrument.Instrument = UserInstrument.belongsTo(Instrument, {
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
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    instrumentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'Instruments',
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

  UserInstrument.init(attributes, {
    sequelize,
    modelName: 'UserInstrument',
    tableName: 'UserInstruments',
  });
  return UserInstrument;
};
