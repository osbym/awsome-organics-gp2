const router = require("express").Router();
const { User } = require("../../models/");

//POST route /api/users/signup that creates a new user and creates a session for that user
// router.post("/signup", (req, res) => {
//   User.create({
//     firstName: req.body.firstName,
//     lastName: req.body.lastName,
//     email: req.body.email,
//     pwd: req.body.pwd,
//   })
//     .then((dbUserData) => {
//       req.session.userId = dbUserData.id;
//       res.json(dbUserData);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

//POST route to /api/users/login that logs in a user and creates a session + redirects to / and shows message
// router.post("/login", (req, res) => {
//   User.findOne({
//     where: {
//       email: req.body.email,
//     },
//   })

//     .then((dbUserData) => {
//       if (!dbUserData) {
//         res.status(400).json({ message: "No user with that email address!" });
//         return;
//       }
//       //if the user is found, compare the password
//       const validPassword = dbUserData.checkPassword(req.body.pwd);
//       if (!validPassword) {
//         res.status(400).json({ message: "Incorrect password!" });
//         return;
//       }
//       //if the password is correct, create a session
//       req.session.userId = dbUserData.id;
//       res.json(dbUserData);
//       //return a success message
//       res.status(200).json({ message: "You are now logged in!" });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

// GET /api/users
router.get("/", (req, res) => {
  //Acces our User model and run .findAll() method)
  User.findAll()
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET /api/users/1
router.get("/:id", (req, res) => {
  User.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// POST /api/users
router.post("/", (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// PUT /api/users/1 (update) put route for User needs to be revisited
router.put("/:id", (req, res) => {
  // if req.body has exact key/value pairs to match the model, you can just use `req.body` instead
  User.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData[0]) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// DELETE /api/users/1
router.delete("/:id", (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// /admin route to check if the user that is logged in is an admin or not (if they are an admin, they can see the admin page)
// router.get("/admin", (req, res) => {
//   if (req.session.loggedIn) {
//     User.findOne({
//       where: {
//         id: req.session.user_id,
//       },
//     }).then((dbUserData) => {
//       if (dbUserData.isAdmin) {
//         res.json(dbUserData);
//       } else {
//         res
//           .status(401)
//           .json({ message: "You are not authorized to view this page" });
//       }
//     });
//   } else {
//     res
//       .status(401)
//       .json({ message: "You must be logged in to view this page" });
//   }
// });

// Export routes for server.js to use.
module.exports = router;
