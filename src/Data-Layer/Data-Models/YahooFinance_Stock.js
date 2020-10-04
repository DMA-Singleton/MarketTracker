/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('YahooFinance_Stock', {
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
    YF_StockName: {
      type: DataTypes.STRING(10),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'YahooFinance_Stock'
  });
};
