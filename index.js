var express = require('express');
var router = express.Router();
var path=require('path');
const mongoose = require('mongoose');
var assert = require('assert');
var bodyParser = require('body-parser')
const bcrypt = require('bcrypt');
const saltRounds = 10;

var expbs  = require('express-handlebars');

var multer = require('multer');
const app = express()




const hbs=expbs.create({

  helpers:{
    'select': function(value, options) {
      // Create a select element 
      var select = document.createElement('select');
  
      // Populate it with the option HTML
      select.innerHTML = options.fn(this);
  
      // Set the value
      select.value = value;
  
      // Find the selected node, if it exists, add the selected attribute to it
      if (select.children[select.selectedIndex])
          select.children[select.selectedIndex].setAttribute('selected', 'selected');
  
      return select.innerHTML;
    }
  }
})

app.engine('handlebars', expbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
//var passport = require('passport');

var morgan= require('morgan');

var expressValidator = require('express-validator');

var routes = require('./app/routes/routes');
var addpost = require('./app/routes/post');
var users = require('./app/routes/users');
var Post=require('./app/models/Post');


// set up our express application
//app.use(morgan('dev')); // log every request to the console

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/images/uploads')
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now())
    }
});





app.locals.moment= require('moment');
app.use(express.static('public'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())


 
//use router
app.use(routes)
app.use(addpost)
app.use('/users',users)


// Set the view engine



//router



app.listen(3000, () => console.log('Server started on port 3000'));