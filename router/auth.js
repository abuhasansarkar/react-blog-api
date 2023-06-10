const router = require("express").Router();
const bcrypt = require("bcrypt");

const User = require("../model/User");

// REGISTER

router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashPassword,
      profilePic: req.body.profilePic,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

// LOGIN

router.post("/login", async (req, res) => {
     // console.log(req.body);
  try {
    const user = await User.findOne({username: req.body.username});
    !user && res.status(400).json("Wrong Credentials !");

    const validated = await bcrypt.compare(req.body.password, user.password);
    !validated && res.status(400).json("Wrong Credentials !");

    const {password, ...other} = user._doc;

    res.status(200).json(other);

  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
