const mongoose=require("mongoose");
const connect=mongoose.connect("mongodb://localhost:27017/login");

//to check database connected or not

connect.then(()=>{
    console.log("Database Connected");
})
.catch(()=>{
    console.log("database not conneccted");
});
// create a schema

const LoginSchema = new mongoose.Schema({
    name:{ 
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});


//collected part

const collection=new mongoose.model("details",LoginSchema)//collectionname,schema name included

module.exports=collection; 

