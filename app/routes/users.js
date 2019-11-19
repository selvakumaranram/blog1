var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
const bcrypt = require('bcrypt');
const saltRounds = 10;

var User=require('../models/User');

const app = express()

app.use(express.static('public'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

mongoose.connect('mongodb://localhost:27017/nodeblog', { useNewUrlParser: true })
    .then(() => "CONNECTED")
    .catch(err => console.error('Something went wrong', err))
/* GET home page. */

router.get('/signup', (req, res) => {
    res.render('users/signup'); 
});

router.get('/login', (req, res) => {
  res.render('users/login'); 
});

router.post('/login/go', (req, res) => {
  User.findOne({email:req.body.email}).then(
     user =>  {
      if(user){
      bcrypt.compare(req.body.password,user.password,(err,matched) => {
        if(err) return err;
             if(matched)
             {
               res.send('User Was Able To Login')
             }
             else{
              res.send('Not Was Able To Login')
             }
      }
      )
    }

    }
 ).catch(function (err) { 
  console.log(err); 
}); 

})


router.post('/register', (req, res) => {
  const newUser ={
    name:req.body.name,
    email:req.body.email,
    password:req.body.password,
    
    
}
bcrypt.genSalt(saltRounds, function(err, salt) {
  bcrypt.hash(newUser.password, salt, function(err, hash) {
      // Store hash in your password DB.
      if(err) return err;
      newUser.password=hash;
      new User(newUser).save()
.then(idea => {
      res.send('register');  
   
})
  });
});
//creating constuctor for object in model/post ans daveing in moongoose


});

module.exports =router;
