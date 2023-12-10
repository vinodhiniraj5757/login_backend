const express=require('express');
const path=require('path');
const bcrypt=require('bcrypt');
const collection=require("./config");



const app=express();

//convert data in json format

app.use(express.json());

app.use(express.urlencoded({extended:false}));





// use ejs('view engine','ejs');

app.set('view engine','ejs');


//static files

app.use( express.static("public"));

app.get("/",(req,res)=>{
    res.render("login");
})

// register user

app.post("/signup",async(req,res)=>{
    const data={
        name:req.body.username,
        password:req.body.password
    }

    //check already the user exists

    const existingUser=await collection.findOne({name:data.name});

    if(existingUser){
        res.send("User already exits.Please choose different name");
    }else{
        // hash the password for not hacking purpose  using bcrypt

        const saltRounds = 10;//no  of salt rounds used for bcrypt
        const hashedPassword = await bcrypt.hash(data.password,saltRounds);
        data.password = hashedPassword;//replace hash pass with original pass
       
       
        // we have to give this in else part bcz db la theriupu enter agathu suppose already exits data na
    const userdata=await collection.insertMany(data);
    console.log(userdata);
    }
});


//login user

app.post("/login",async(req,res)=>{
    try{
        const check=await collection.findOne({name:req.body.username});
        if(!check){
            res.send("user name cannot found");
        }

        //compare the hash password from database with the plain text
        const isPasswordMatch= await bcrypt.compare(req.body.password,check.password);
        if(isPasswordMatch)
        {
            res.render("home");
        }else{
            res.send("wrong password");
        }
    }catch{
            res.send("wrong details");
        }
});





app.get("/signup",(req,res)=>{
    res.render("signup");
})






app.listen(1234, () => {
    console.log("Server is running on port: 1234");
});
