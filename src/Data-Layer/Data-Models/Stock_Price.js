/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Stock_Price', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Stock_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'Stock',
        },
        key: 'ID'
      }
    },
    Date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    Open: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    Close: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    Volume: {
      type: DataTypes.DOUBLE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Stock_Price'
  });
};
