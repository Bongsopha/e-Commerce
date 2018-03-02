var express = require('express');
var router = express.Router();
const passport = require('passport');
const jwt  = require('jsonwebtoken');

const User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//Registration
router.post('/register', function(req, res, next) {
  //res.send('REGISER');
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });
  User.addUser(newUser, (err, user)=>{
    if(err){
      res.json({success: false, msg:'Failed to register user'});
    }
    else{
      res.json({success: true, msg:'User Registered'});
    }
  });
});

router.post('/authenticate', function(req, res, next) {
  const username= req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user)=>{
    if(err) throw err;
    if(!user){
      return res.json({success: fales,msg: 'User not found'});
    }
    User.comparePassword(password, user.password, (err, isMatch)=>{
      if(err) throw err;
      if(isMatch){
          const token = jwt.sign(user, config.secret, {
            expiresIn: 604800 //1 week
          });
          res.json({
            success:true,
            token: 'JWT'+token,
            user: {
              id: user_id, 
              name: user.name,
              username: user.username,
              email: user.email
            }
          });
      }
      else{
        return res.json({success: false, msg: 'Wrong Password'});
      }
    });

  });
});

router.get('/profile', function(req, res, next) {
  res.send('PROFILE');
});

router.get('/validate', function(req, res, next) {
  res.send('VALIDATED');
});

module.exports = router;
