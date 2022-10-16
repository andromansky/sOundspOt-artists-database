const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Band extends Model {
    static associate({
      User, BandDemo, BandGenre, UserBand,
    }) {
      Band.Creater = Band.belongsTo(User, {
        foreignKey: 'createrId',
      });

      Band.Demo = Band.hasMany(BandDemo, {
        foreignKey: 'bandId',
      });

      Band.User = Band.hasMany(UserBand, {
        foreignKey: 'bandId',
      });

      Band.Genre = Band.hasMany(BandGenre, {
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
    createrId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    about: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    photo: {
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

  Band.init(attributes, {
    sequelize,
    modelName: 'Band',
    tableName: 'Bands',
  });
  return Band;
};
