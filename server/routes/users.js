const express = require('express');
const router = express.Router();
const User = require('../models/Users')

/* GET users listing. */
router.get('/test', (req, res) => {
  res.send('respond with a resource');
});

//@route POST user/auth/register
//@desc  Register a user
//@access Public

router.post('/auth/register', (req,res)=> {
  const newUser = new User({
      name : req.body.name,
      email: req.body.email,
      password : req.body.password
  })
  User.create((newUser))
  .then(user => res.json(user))
  .catch(err => res.send(err))
  // User.save((err) => {res.json({msg:"Error in saving a user"})
  // })
})

module.exports = router;

//@route POST user/auth/login
//@desc  Logging in user
//@access Public

