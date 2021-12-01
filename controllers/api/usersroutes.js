const router = require("express").Router();
const { User } = require("../models/");

//TODO create user route 'post route'
router.post("/api/users", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

//TODO update user route 'put route'
router.put("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      const updatedUser = await user.update(req.body);
      res.status(200).send(updatedUser);
    } else {
      res.status(404).send({
        message: "User not found",
      });
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

//TODO delete user route 'delete route' //optional
router.delete("/api/users/:id", async (req, res) => {
  try {
    //what is try? it is a try catch block that is used to handle errors. basically it is a try catch block that is used to handle errors.
    const user = await User.findByPk(req.params.id);
    if (user) {
      const deletedUser = await user.destroy();
      res.status(200).send(deletedUser);
    } else {
      res.status(404).send({
        message: "User not found",
      });
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
