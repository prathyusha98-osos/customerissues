var mongoose=require('mongoose')
var Issue=require('./Issue')
var customerSchema=new mongoose.Schema({
    name:{
        type:String
    },
    issues:[Issue.schema]    
})


var Customer=mongoose.model('Customer',customerSchema,'Customer');
module.exports= Customer;