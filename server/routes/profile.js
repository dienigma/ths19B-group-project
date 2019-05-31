const express = require('express');
const router = express.Router();

//@route GET user/profile/test
//@desc  Testing
//@access Public

router.get('/test',(req,res)=> {
    res.send("test are working")
})

//@route GET user/profile/:name
//@desc  Retrieve a user profile
//@access Private

router.get('/:name', (req,res) => {
    Profile.findById(req,user.id)
    .then((profile) => res.status(200).json(profile))
    .catch(err => res.json(err))
})

//@route POST user/profile/update
//@desc  Update a user profile
//@access Private

router.post('/update/:name', (req,res)=> {
    const newProfile = new Profile ({
        user : {
            name : req.user.name,
            email : req.user.email,
        },
        bio : req.body.bio,
        location : req.body.location,
    })
    Profile.findById(req.user.id)
    .then((profile) => {
        if (!profile) {
           Profile.create((newProfile))
           .then((createdProfile) => {res.json(createdProfile)})
           .catch(err => res.send(err))          
        } 
        Profile.findByIdAndUpdate(req.user.id, (newProfile), {new :true} ,(req,res)=> {
            res.status(200).json(newProfile)
        })
    })
    
})

//@route GET user/profile/
//@desc  Retrieve a user profile
//@access Private



module.exports = router;