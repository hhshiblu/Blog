const mongoose=require("mongoose")
DB=process.env.DB;

mongoose.set('strictQuery', true);
  


mongoose.connect(DB).then(()=>{
    console.log("database connected")
}).catch(err=>console.log(err));