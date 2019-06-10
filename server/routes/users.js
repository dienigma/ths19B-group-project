const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const User = require('../models/Users');


/* GET users listing. */
router.get('/test', (req, res) => {
  res.send('users are working');
});

//@route POST user/auth/register
//@desc  Register a user
//@access Public

router.post('/auth/register', (req,res) => {
  User.findOne({email: req.body.email})
  .then((user) => {
    if(user) {
      res.status(400).json({email: "Email already exists"})
     }else {
        const newUser = new User({
         name : req.body.name,
         email : req.body.email,
         password : req.body.password
        })
        
        bcrypt.genSalt(10, function(err, salt) {
          bcrypt.hash(newUser.password, salt, function(err, hash) {
        // Store hash in your password DB.
            if(err) throw err;
            else {
              newUser.password = hash;
              newUser.save((err,user) => {
                if (err) {
                 console.log(err)
                } else {
                 res.json(user)
                }
              })
            }
          })
        })
      }
  })
})

//@route POST user/auth/login
//@desc  Logging in user
//@access Public

router.post('/auth/login', (req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    //Find user by email
    User.findOne({email})
    .then(user => {
        if(!user) {
          return res.status(404).json({email: "Email not found"})
        }
        bcrypt.compare(password, user.password)
        .then((isMatch) =>{
          if (!isMatch) {
            res.status(400).json({password:"Password not correct"})
          } else {
            const payload = { id: user.id, name: user.name} //Create JWT payload
            //Sign JWT Token
            jwt.sign(payload, "keep secret", {expiresIn: 3600}, (err,token)=> {
              if(err) {
                throw err
              } else { 
                res.json({
                success: true,
                token : 'Bearer ' + token
                })
              }
            })
          }
        })
    })
    .catch((err) => {throw err})
})

   
 

module.exports = router;



