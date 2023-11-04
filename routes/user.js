const express = require("express");
const router = express.Router();
const {userCollection} = require("../Schema/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
// const secret = "gfausudsgdhsfgcbuccgybfcuibub";
const {isUserLoggedIn,adminsOnly} = require("./middlewares")



router.post("/register", async(req,res)=>{
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    await userCollection.create({
        fullName: req.body.fullName,
        userName: req.body.userName,
        password: hashedPassword,
        role: req.body.role
    });

    res.status(201).send("created successfully");
});


router.post("/login", async(req,res)=>{
    const userDetail = await userCollection.findOne({
        userName: req.body.userName
    });

    if(!userDetail) return res.status(404).send("User Not Found");

    const doesPasswordMatch = bcrypt.compareSync(req.body.password, userDetail.password);

    if(!doesPasswordMatch) return res.status(400).send("Invalid Credential");

    const token = jwt.sign({
        userName: userDetail.userName,
        userId : userDetail._id,
        role: userDetail.role
    }, process.env.secret);

    res.status(200).send({
        message: "sign in successfully",
        token: token
    });

});

module.exports = router;