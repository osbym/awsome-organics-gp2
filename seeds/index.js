const seedProducts = require("./product-seeds");

const sequelize = require("../config/connection");

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log("--------------");
  await seedProducts();
  console.log("--------------");

  //   await seedPosts();
  //   console.log("--------------");

  //   await seedComments();
  //   console.log("--------------");

  //   await seedVotes();
  //   console.log("--------------");

  process.exit(0);
};

seedAll();
