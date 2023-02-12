const express = require("express");
const router = express.Router();
const User = require("../../Schema/userSchema");

// Get all users
router.get("/", (req, res) => {
    User.find((err, users) => {
        if (err) {
            return res.send(err);
        }
        res.json(users);
    });
});

// Get user by id
router.get("/:id", (req, res) => {
    User.findById(req.params.id, (err, singleUser) => {
        if (err) {
            return res.send(err);
        } else if (singleUser === null) {
            return res.status(400).json({msg: "User not found", err});
        }
        res.json(singleUser);
    });
});


// Create a new user
router.post("/", (req, res) => {
    var createUser = new User({
        name: req.body.name,
        age: req.body.age,
        status: req.body.status
    });

    if (!createUser.name || !createUser.age) {
        return res.status(400).json({msg: "Please provide the name and age "});
    }

    createUser.save(function (err) {
        if (err) {
          return res.send(err);
        }
    
        res.json({ message: 'User created!' });
    });
});

// // Update a user data
router.put("/:id", (req, res) => {
    User.findById(req.params.id, (err, singleUser) => {
        if (err) {
            return res.send(err);
        }
        singleUser.name = req.body.name ? req.body.name : singleUser.name;
        singleUser.age = req.body.age ? req.body.age : singleUser.age;
        singleUser.status = req.body.status ? req.body.status : singleUser.status;

        singleUser.save((err) => {
            if (err) {
              return res.send(err);
            }
      
            res.json({ message: "User Data updated!", singleUser });
          });
    });
});

// // Delete a User
router.delete("/:id", (req, res) => {
    User.remove({
        _id: req.params.id
      }, (err, user) => {
        if (err) {
          return res.send(err);
        }
        res.json({ message: 'User successfully deleted' });
      });
});

module.exports = router;