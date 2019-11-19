const mongoose = require('mongoose');
 
const PostSchema = new mongoose.Schema({
    title: String,
    category: String,
    author: String,
    body:String,
    date:{ type : Date, default: Date.now },
    mainimage:String
});
 
const posts = mongoose.model('Post', PostSchema);
 
module.exports = posts;

