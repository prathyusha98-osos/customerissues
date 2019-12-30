var mongoose=require('mongoose')
var issueSchema=new mongoose.Schema({
   
   text:{
    type:String
   },
   Date   : Date
});

var Issue=mongoose.model('Issue',issueSchema,'issues');

module.exports = Issue;

