module.exports = function (sequelize, DataTypes) {
  const Cart = sequelize.define(
    "Cart",
    {
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          len: [1, 10],
        },
      },
    },
    {
      classMethods: {
        associate: function (models) {
          Cart.belongsTo(models.Product, {}),
            Cart.belongsTo(models.User, {
              foreignKey: {
                allowNull: true,
              },
            });
        },
      },
    }
  );
  return Cart;
};
