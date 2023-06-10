const router = require("express").Router();

const User = require("../model/User")

// REGISTER

router.post("/register", async(req, res) => {
     try {
          const newUser = new User({
               username: req.body.username,
               email: req.body.email,
               password: req.body.password,
               profilePic: req.body.profilePic,
          })

          const user = await newUser.save();
          res.status(200).json(user);
          
     } catch (error) {
          res.status(500).json(error)
     }
});



// LOGIN




module.exports = router;