const mongoose = require("mongoose");

const imagenScheme = new mongoose.Schema({
    url:{
        type:String,
        required:true
    },
    filename:{
        type:String,
        required:true
        
    }
},{ 
    timestamps:true,
    versionKey:false

})
module.exports = mongoose.model("imageModel", imagenScheme)