var mongoose=require('mongoose')


    
const issueListSchema=new mongoose.Schema({
    name:String,
    issues:[{
    type:mongoose.Schema.Types.ObjectId,
            ref:'Issue'}]
    })
    module.exports=mongoose.model("IssueList",issueListSchema,"IssueList")


    const Issue=new mongoose.Schema({
        issue:String
    })
    module.exports=mongoose.model("Issue",Issue,"issues")


    