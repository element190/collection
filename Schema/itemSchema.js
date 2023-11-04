const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    isInStock:{
        type: Boolean,
        required: true,
    },
}, {timestamps : true});

const itemCollection = mongoose.model("items", itemSchema);

module.exports = {
    itemCollection
};
