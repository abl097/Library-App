const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken")

const PORT = process.env.PORT || 3000

const bookdata = require("./src/model/Bookmodel")
const userdata = require("./src/model/Signupmodel")

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen( PORT , (req,res)=>{
    console.log(`Server Running on PORT ${PORT}`)
})

app.get("/books" , (req,res)=>{

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
   
     bookdata.find()
     .then((data)=>{
      res.send(data)
     });
   
   });
   
   
   app.post("/add" , (req,res)=>{
   
       res.header("Access-Control-Allow-Origin", "*");
       res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
   
       console.log(req.body)
   
      var book ={
   
           slno:req.body.data.slno,
           bookname:req.body.data.bookname,
           author:req.body.data.author,
           edition:req.body.data.edition,
           imageurl:req.body.data.imageurl
   
       }
       
       var book = new bookdata(book);
       book.save();
   
   });

   app.delete("/delete/:id" , (req,res)=>{

    id = req.params.id;
    console.log(id)

    bookdata.findByIdAndDelete({"_id":id})
    .then(()=>{
        console.log(`Deleted ${id}`)
        res.send()
    })

});

app.put("/update" , (req,res)=>{

    console.log(req.body)

    id=req.body._id,
    slno=req.body.slno,
    bookname=req.body.bookname,
    author=req.body.author,
    edition=req.body.edition,
    imageurl=req.body.imageurl

    console.log(id)
 
  bookdata.findByIdAndUpdate({"_id":id},
                                    {$set:{
                                    "slno":slno,
                                    "bookname":bookname,
                                    "edition":edition,
                                    "author":author,
                                    "imageurl":imageurl
                                    }})

    .then((data)=>{
        res.send(data) 
    })

});   

app.get("/:id" , (req,res)=>{
    let id = req.params.id

 bookdata.findOne({"_id":id})
    .then((data)=>{
        res.send(data)
    })

})


// ............ sign up...................//


app.post("/adduser" , (req,res)=>{
   
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");

    console.log(req.body)

   var user ={

        username:req.body.data.username,
        email:req.body.data.email,
        password:req.body.data.password 
        
    }
    
    var user = new userdata(user);
    user.save();

});

// ............ login...................//


app.post("/login" , (req,res)=>{
   
    let logindata = req.body;
    console.log(logindata.data.username)
    uname= logindata.data.username;
    pword= logindata.data.password;
    if(uname==="admin" && pword==="1234"){
        let payload = {subject:uname+pword};
        let token = jwt.sign(payload , "secretkey")
        res.status(200).send({token})
    }else{

   userdata.findOne({"username":logindata.data.username , "password":logindata.data.password}).then((data)=>{
    console.log(data)
    if(data===null){
        res.status(401).send("Invalid Username & password")
      
    }else if(data.username === uname && data.password === pword){
        let payload = {subject:uname+pword};
        let token = jwt.sign(payload , "secretkey")
        res.status(200).send({token})
       
    }else{
         res.status(401).send("Invalid Username & password")

    }
  })
 }
})