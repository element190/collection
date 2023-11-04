const express = require("express");
const port = process.env.PORT || 2000;
const app = express();
const mongoose = require("mongoose");
require("dotenv").config(); 
const userRoute = require("./routes/user");
const itemRoute = require("./routes/item");


const connect = mongoose.connect(process.env.mongoDbUrl);

connect.then(()=> {
    console.log("Connected successfully to my database");
}).catch((error)=>{
    console.log("Could not connect to the database, reason = ", error);
});

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use("/version/user", userRoute);
app.use("/version/item", itemRoute);


app.listen(port, function(){
    console.log("Listening on port", port);
});

