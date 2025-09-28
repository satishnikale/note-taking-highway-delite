const {login,signup}= require("../controllers/userController");

const express = require("express")
const userRouter = express.Router();



// 
userRouter.post("/signup",signup);
userRouter.post("/login",login);

module.exports=userRouter;