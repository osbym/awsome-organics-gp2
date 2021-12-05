// "use strict"; //use strict to prevent accidental global variable creation
// const bcrypt = require("bcrypt");

// module.exports = (sequelize, DataTypes) => {
//   const User = sequelize.define(
//     "User",
//     {
//       username: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         validate: {
//           len: [6], //this means
//         },
//       },
//       email: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         validate: {
//           isEmail: true,
//         },
//       },
//       // The password cannot be null
//       password: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//     },
//     {
//       // Hooks are automatic methods that run during various phases of the User Model lifecycle
//       // In this case, before a User is created, we will automatically hash their password
//       hooks: {
//         beforeCreate: (user, options) => {
//           user.password = bcrypt.hashSync(
//             user.password,
//             bcrypt.genSaltSync(10),
//             null
//           );
//         },
//       },
//     }
//   );
//   User.prototype.validPassword = function (password) {
//     return bcrypt.compareSync(password, this.password);
//   };
//   // User.associate = models => {
//   //   // associations can be defined here
//   //   User.hasMany(models.Trip, {
//   //     onDelete: "cascade"
//   //   });

//   return User;
// };

// //we can just use the model in the controller file and not have to export it here
const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

// create our User model
class User extends Model {
  // set up method to run on instance data (per user) to check password
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// create fields/columns for User model
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4],
      },
    },
  },
  {
    hooks: {
      // set up beforeCreate lifecycle "hook" functionality
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },

      async beforeUpdate(updatedUserData) {
        updatedUserData.password = await bcrypt.hash(
          updatedUserData.password,
          10
        );
        return updatedUserData;
      },
    },
    sequelize, //this is to connect to the database
    timestamps: false, //this is to prevent the default timestamps from being created
    freezeTableName: true, //this is to prevent sequelize from pluralizing the table name
    underscored: true, //this is to prevent sequelize from using camelcase
    modelName: "user", //this will be the table name in the database
  }
);

module.exports = User;
