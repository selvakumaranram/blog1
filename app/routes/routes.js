var express = require('express');
const app = express();
var router = express.Router();;
var mongoose = require('mongoose')
var Post=require('../models/Post');

var Category=require('../models/Category');
var exphbs  = require('express-handlebars');
//for using javascript and jquery
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;

var $ = jQuery = require('jquery')(window);

mongoose.connect('mongodb://localhost:27017/nodeblog', { useNewUrlParser: true })
    .then(() => "CONNECTED")
    .catch(err => console.error('Something went wrong', err))

    var hbs=exphbs.create({
      // Specify helpers which are only registered on this instance.
      helpers: {
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
    });
    app.engine('handlebars', exphbs({
      defaultLayout: 'main'
    }));
/* GET home page. */
router.get('/', (req, res) => {
  Post.find({}, (err, posts) => {
      
  res.render('index',{ 
    posts: posts,
   

  }); 
});
});

router.get('/about', (req, res) => {
  res.render('about');
});

router.get('/contact', (req, res) => {
  res.render('contact');
});

router.get('/addPost', (req, res) => {


    

  Category.find({},{},function(err,categories){

    res.render('addpost',{
      'categories':categories,
      helpers: {
        'select': function( value, options ){
          var $el = $('<select />').html( options.fn(this) );
          $el.find('[value="' + value + '"]').attr({'selected':'selected'});
          return $el.html();
      }
      }
    });
  });
  
});


router.get('/blog', (req, res) => {
  res.render('blog',{
  

    // Override `foo` helper only for this rendering.
    
    helpers: {
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
});
});





module.exports = router;
