const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const User = require('../models/Users');
const Token = require('../models/Token');
const transporter = require('../config/nodemailer-sendgrid');
const crypto = require('crypto')

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
                    //Creating a token for email confirmatuion
                    const token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
 
                   // Save the verification token
                    token.save(function (err) {
                      if (err) { return res.status(500).send({ msg: "error" }); }
 
                   // Send the email
                      const mailOptions = { 
                      to: user.email, 
                      from: 'Auth App "no-reply@yourwebapplication.com"', 
                      subject: 'Account Verification Token', 
                      html: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '.\n',
                      };
        
                      transporter.sendMail(mailOptions, function (err) {
                      if (err) { console.log(err); return res.status(500).send({ msg: "Error in email send" }); }
                      res.status(200).send('A verification email has been sent to ' + user.email + '.');
                      });
                    })
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
                //Email confirmation done or not
                if (!user.isVerified) {
                  return res.status(401)
                         .json({ 
                           type: 'not-verified', 
                           msg: 'Your account has not been verified.',
                           success: true,
                           token : 'Bearer ' + token
                         });
                } else {
                  res.status(200)
                  .json({
                  success: true,
                  token : 'Bearer ' + token
                  })
                  }
              }
            })
          }
        })
    })
    .catch((err) => {throw err})
})

// @route /user/confirmation
// @desc confirming email 

router.post('/confirmation/:tokenId', (req,res) => {
  Token.findOne({ token: req.params.tokenId }, (err, token) => {
      if (!token) return res.status(400).send({ type: 'not-verified', msg: 'We were unable to find a valid token. Your token my have expired.' });

      // If we found a token, find a matching user
      User.findOne({ _id: token._userId})
      .then(user => {
          if (!user) 
            return res.status(400).send({ msg: 'We were unable to find a user for this token.' });
          if (user.isVerified) 
            return res.status(400).send({ type: 'already-verified', msg: 'This user has already been verified.' });
          
      // Verify and save the user
          user.isVerified = true;
          user.save(function (err) {
              if (err) { return res.status(500).send({ msg: "error in saving the email verified status" }); }
              res.status(200).send("The account has been verified. Please log in.");
          });
      })
      .catch((err) => res.send(err))
  });
})

// @route /user/resend
// @desc Resend confirmation email 

router.post('/resend', (req,res)=> {
  User.findOne({ email: req.body.email })
  .then((user) => {
      if (!user) 
        return res.status(400).send({ msg: 'We were unable to find a user with that email.' });
      if (user.isVerified) 
        return res.status(400).send({ msg: 'This account has already been verified. Please log in.' });

      // Create a verification token, save it, and send email
      const token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });

      // Save the token
      token.save(function (err) {
          if (err) { return res.status(500).send({ msg: "Error in saving the token" }); }

      // Send the email
         
      const mailOptions = { 
          to: newUser.email, 
          from: 'Auth App "no-reply@yourwebapplication.com"', 
          subject: 'Account Verification Token', 
          html: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '.\n',
          
      };
      
      transporter.sendMail(mailOptions, function (err) {
          if (err) { console.log(err); return res.status(500).send({ msg: "Error in email send" }); }
          res.status(200).send('A verification email has been sent to ' + newUser.email + '.');
      });
  }) 
});
});

// @route /user/resetpassword
// @desc Forget Password 

router.post('/resetpassword', (req,res)=> {
  User.findOne({email:req.body.email})
  .then((user) => {
      if(!user) {
          res.send('No such user exists')
      } 

      const token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });

      // Save the token
      token.save(function (err) {
          if (err) { return res.status(500).send({ msg: err.message }); }

      // Send the email
         
      const mailOptions = { 
          to: user.email, 
          from: 'Forget password "no-reply@yourwebapplication.com"', 
          subject: 'Reset Password', 
          html: 'Hello,\n\n' + 'It seems you have made a request to change a password. You can change the password by clicking the link: \nhttp:\/\/' + req.headers.host + '\/changepassword\/' + token.token + '.\n',
      
      };
      //console.log(req.headers)
      transporter.sendMail(mailOptions, function (err) {
          if (err) { console.log(err); return res.status(500).send({ msg: "Error in email send" }); }
          res.status(200).send('A link to change a password is sent to ' + user.email + '.');
      });

  })
})
})

// @route /user/changepassword
// @desc Change Password 

router.post('/changepassword/:tokenId', (req,res) => {
  // Check Token is correct or not
    Token.findOne({ token: req.params.tokenId})
      .then((token) => {
      if (!token) return res.status(400).send({ type: 'not-verified', msg: 'We were unable to find a valid token. Your token my have expired.' })
        
      // Find a user from token   
  
      User.findOne({ _id : token._userId})
      .then((user)=> {
  
          //Save the new password
  
          user.password = req.body.password
           user.save(function (err) {
              if (err) { return res.status(500).send({ msg: 'Error in saving the password' }); }
              res.status(200).send("The password has been changed. Please log in.");
          });
      })
      .catch(err => {throw err})
  })
  .catch(err => {throw err})
})

module.exports = router;



