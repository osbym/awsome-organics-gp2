// "use strict";

// module.exports = (sequelize, DataTypes) => {
//   const Product = sequelize.define("Product", {
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
//   });
//   Product.associate = (models) => {
//     // associations can be defined here
//     Product.hasMany(models.Category, {
//       foreignKey: {
//         allowNull: false,
//       },
//     });
//   };
//   return Product;
// };

const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Products extends Model {}

Products.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {},
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    // img: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    //   validate: {},
    // },
  },
  {
    sequelize,
    // timestamps: false, //this will not create the created_at and updated_at columns in the database table
    // freezeTableName: true,
    // underscored: true,
    // modelName: "products",
  }
);

module.exports = Products;
