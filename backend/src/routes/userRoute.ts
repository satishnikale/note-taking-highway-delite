
const { signUp, login,sendOTP } = require("../controllers/userController");

const express = require("express")

const router = express.Router();

router.post("/signup",signUp);
router.post("/login",login);

router.post("/sendotp",sendOTP);


module.exports=router;