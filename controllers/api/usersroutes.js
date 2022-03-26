const router = require("express").Router();
const { User } = require("../../models/");

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
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    pwd: req.body.pwd,
  })
    .then((dbUserData) => {
      req.session.save(() => {
        req.session.userId = dbUserData.id;
        req.session.firstName = dbUserData.firstName;
        req.session.lastName = dbUserData.lastName;
        req.session.email = dbUserData.email;
        req.session.loggedIn = true; //where is loggedIn

        res.json(dbUserData);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/login", (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((dbUserData) => {
    if (!dbUserData) {
      res.status(400).json({ message: "No user found with this email" });
      return;
    }

    const validPassword = dbUserData.checkPassword(req.body.pwd);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password" });
      return;
    }
    req.session.save(() => {
      req.session.userId = dbUserData.id; //this line of code is saying
      req.session.email = dbUserData.email;
      req.session.loggedIn = true;
      res.json({ user: dbUserData, message: "You are now logged in" });
    });
  });
});

//logout
router.get("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).json({ message: "You are now logged out" }).end();
    });
  } else {
    res.status(404).end();
  }
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
