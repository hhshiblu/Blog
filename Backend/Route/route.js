const express = require("express");
const { signUp, signin } = require("../Controlar/Controlar");
const { auth, getUser } = require("../MiddleWare/Auth");
const router = express.Router();

router.post("/signUp", signUp); 
router.post("/signIn",signin)  
router.get("/about",auth,getUser,(req,res)=>{
    res.send("jkshfdjadskj") 
})

module.exports = router;
