const express = require("express");
const route = express.Router();
const {itemCollection} = require("../Schema/itemSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
require("dotenv").config();
const {isUserLoggedIn,adminsOnly} = require("./middlewares");



route.use(isUserLoggedIn);
 
// User to find all items
route.get("/", async(req,res)=>{
    try{
        const items = await itemCollection.find();
        res.status(200).json({
            message : "All items",
            items
    });
    }catch(error){
        console.log(error);
    }
});


// User to find item by id
route.get("/:id", async (req,res)=>{
    const item = await itemCollection.findById({_id:req.params.id});
    res.status(200).send({
        message : "Seraching by id",
        item
    })
});


// Admins Only to add items
route.post("/add-item",adminsOnly, async (req,res)=>{
    try{
        const items = await itemCollection.create({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            isInStock: req.body.isInStock
        });
    
        res.status(200).send({
            message: "Create item Successfully",
            items: items
        })
    }catch(error){
        res.status(403).send("action-not-allowed");
    }
});


// Admins Only to updated items by description or by words
route.patch("/edit-items-by-id/:id",adminsOnly, async (req,res)=>{
    try{
        const itemEdit = await itemCollection.findByIdAndUpdate({_id: req.params.id},{
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
        }, {new: true});
    
        if(!itemEdit) return res.status(404).send("not found");
    
        res.status(200).send({
            message: "Items updated succesffully",
            itemEdit
        })
    }catch(error){
        console.log(error);
        res.status(403).send("action-not-allowed");  
    }
});

// Admins Only to edit items by finding product id
// route.put("/edit-items-by-id/:id",adminsOnly, async (req,res)=>{
//     try{
//         const updatedTask = await itemCollection.findbyIdAndUpdate(req.params.id,{
//             name: req.body.name,
//             description: req.body.description,
//             price: req.body.price,
//             isInStock: req.body.isInStock
//         }, {new: true});
    
//         if(!updatedTask) return res.status(404).send("Not found");
    
//         res.status(200).send({
//             message: "Task Updated Successfully",
//             updatedTask
//         });
//     }catch (error){
//         console.log(error);
//         res.status(403).send("action-not-allowed");
//     }
// });


route.delete("/:id",adminsOnly,async (req,res)=>{
    try{
        const deletedTask = await itemCollection.findByIdAndDelete({id:req.params.id});
        if(!deletedTask) return res.status(400).send("Not Found");
        res.status(200).send("Task has been deleted successfully!");
    } catch (error) {
            console.log(error);        
            res.status(403).send("action-not-allowed");
        }
});



module.exports = route;
