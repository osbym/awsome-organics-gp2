const { Product } = require("../models");

const productdata = [
  {
    name: "Product 1",
    category_id: 1,
    description: "Product 1 description",
    quantity: 10,
    price: 10.0,
  },

  //   {
  //     name: {
  //       type: DataTypes.STRING,
  //       allowNull: false,
  //     },
  //     category_id: {
  //       type: DataTypes.INTEGER,
  //       allowNull: false,
  //     },
  //     description: {
  //       type: DataTypes.STRING,
  //       allowNull: false,
  //       validate: {
  //         len: [1],
  //       },
  //     },
  //     quantity: {
  //       type: DataTypes.INTEGER,
  //       allowNull: false,
  //     },
  //     price: {
  //       type: DataTypes.DECIMAL,
  //       allowNull: false,
  //     },
  //   },
];
const seedProducts = () => Comment.bulkCreate(productdata);

module.exports = seedProducts;
