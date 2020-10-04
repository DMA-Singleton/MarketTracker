/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Stock', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    Symbol: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    Market: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Stock'
  });
};
