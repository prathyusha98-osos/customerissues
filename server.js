var express = require('express');
var app= express();
app.set('view engine', 'ejs');
var mongoose=require('mongoose');
mongoose.connect("mongodb://localhost:27017/osos");
// var Issue=require('./issueschema')
var Issue=require('./Issue')
var Customer=require('./Customer')
var bodyParser = require('body-parser'); 
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.listen(process.env.PORT|| 3001,()=>{
    console.log("start the server with port 3001")
  })


  app.get('/issue',(req,res)=>{
      res.render('issue')
  })

  app.post("/issue/submit",(req,res)=>{
Issue.create({
    text:req.body.text,
    Date:new Date()
},(err,issue)=>{
    if(err){
        console.log(err)
    }else{
        console.log(issue)
        Customer.find({name:req.body.name},(terr,tcustomer)=>{
            if(terr){
                console.log(err)
            }else{
                if(tcustomer.length==0){
                    console.log('empty array');
                    Customer.create({
                        name:req.body.name,
                        issues:[issue._id]
                    })
                }else{
                    console.log("its not empty")
                    var customer=tcustomer[0]
                    
                    customer.issues.push(issue)
                    console.log(customer)
                    Customer.updateOne({name:req.body.name},customer,(uerr,udata)=>{
                        if(uerr){
                            console.log(uerr)
                        }else{
                            res.send({message:"thank u for send the issue and u r case id is "+issue._id})
                        }
                    })
                }
            }
        })
    }
})
  })

  app.get('/issues',(req,res)=>{
      Customer.find({name:req.body.name})
    //   .populate('issues')
      .exec((err,customer)=>{
          if(err){
              console.log(err)
          }else{
              console.log(customer)
              var customer=customer[0];
            //   for(var i=0;i<customer.issues.length;i++){
            //       console.log(customer.issues[i]);
            //   }
            res.send({customer:customer})
          }
      })
  })
