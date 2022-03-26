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
const { Sequelize, Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

// create our User model
class User extends Model {
  // set up method to run on instance data (per user) to check password
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.pwd);
  }
}

// create fields/columns for User model
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },

    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {},
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {},
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    pwd: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4],
      },
    },

    role: {
      type: DataTypes.ENUM("user", "admin"),
      defaultValue: "user",
    },
  },

  {
    hooks: {
      // set up beforeCreate lifecycle "hook" functionality
      async beforeCreate(newUserData) {
        newUserData.pwd = await bcrypt.hash(newUserData.pwd, 10);
        return newUserData;
      },

      async beforeUpdate(updatedUserData) {
        updatedUserData.pwd = await bcrypt.hash(updatedUserData.pwd, 10);
        return updatedUserData;
      },
    },
    sequelize, //this is to connect to the database
    timestamps: false, //this is to prevent the default timestamps from being created
    freezeTableName: true, //this is to prevent sequelize from pluralizing the table name
    underscored: true, //this is to prevent sequelize from using camelcase
    modelName: "User", //this will be the table name in the database
  }
);

module.exports = User;
