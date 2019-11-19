var express = require('express');
var multer = require('multer');
var mongoose = require('mongoose')
var addpost= express.Router();
var bodyParser = require('body-parser');
var exphbs  = require('express-handlebars');
var Post=require('../models/Post');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;


//app ins 
var app=express();

app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');
app.use(express.static(__dirname+'/public'));

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/images/uploads')
    },
    filename: (req, file, cb) => {
        
      cb(null, file.originalname + '-' + Date.now()+'.'+(file.mimetype).slice(6))
    }
});
//uploading file path


//bodyparser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))

//connect mongodb
mongoose.connect('mongodb://localhost:27017/nodeblog', { useNewUrlParser: true })
    .then(() => "CONNECTED")
    .catch(err => console.error('Something went wrong', err))

//index route passing post and receving heading in home page of all database values
    addpost.get('/', (req, res) => {
      Post.find({}, (err, posts) => {
      res.render('index',
      { posts: posts}
      ); 
    });
    });

//fetching single page using id
addpost.get('/posts/show/:_id',(req,res,next) =>{
	
	Post.findById(req.params._id , (err, posts) => {
       res.render('innerblog',{ 
         posts: posts
      
      }
       ); 
	  });
}

)



var upload = multer({storage: storage});
addpost.post('/fileUpload', upload.single('image'), (req, res, next) => {
let errors=[]
  if(!req.body.title){
    errors.push({text:'Please add a title'});
  }
  if(!req.body.body){
    errors.push({text:'Please add some text in body'});
  }
  if(!req.file.filename){
    errors.push({text:'Please upload some file'});
  }
  
  if(errors.length > 0){
    res.render('addpost', {
      errors: errors,
      title: req.body.title,
      body: req.body.body,

    });
  } else {
  // Check Image Upload
  //req.checkBody('body', 'Body field is required').notEmpty();

// Check Image Upload
const newUser ={
    title:req.body.title,
    category:req.body.category,
    body:req.body.body,
    mainimage:req.file.filename
    
}
//creating constuctor for object in model/post ans daveing in moongoose
new Post(newUser)
.save()
.then(idea => {
        
    res.redirect('/')
    console.log("file uploaded sucessfully")
})
  }
});

var insertDocuments = function(db, filePath, callback) {
    var collection = db.collection('user');
    collection.insertOne({'imagePath' : filePath }, (err, result) => {
        assert.equal(err, null);
        callback(result);
    });
}
//insert operation blog post with image




module.exports = addpost;