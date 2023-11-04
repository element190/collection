const jwt = require("jsonwebtoken");
require("dotenv").config();
// const secret = "gfausudsgdhsfgcbuccgybfcuibub";

function isUserLoggedIn(req, res, next){
    const authorizationHeader = req.headers.authorization;

    if(!authorizationHeader){
        res.status(401).send("no- authorization-header");
        return;
    }

    const input = authorizationHeader.split(" ");

    const tokenType = input[0];

    const tokenValue = input[1];

    if(tokenType == "Bearer"){
        const decoded = jwt.verify(tokenValue, process.env.secret);
        req.decoded = decoded;
        next();
        return;
    }

    res.status(401).send("not authorized");
}


function adminsOnly(req,res,next){
    if(req.decoded.role == "admin"){
        next();
    } else{
        res.status(401).send("You are not admin");
    }
}

module.exports = {isUserLoggedIn, adminsOnly};
