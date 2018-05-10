/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  var Sale = sequelize.define('sale', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    item_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'item',
        key: 'id'
      }
    },
    quantity: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    date_of_purchase: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn('current_timestamp')
    }
  });
  return Sale;
};
