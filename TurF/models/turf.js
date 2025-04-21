const mongoose = require('mongoose');

const turfSchema = mongoose.Schema({
    turfName:{
        type:String,
        require:true,
        unique:true,
    },
    categories: [
           { type:String,
            reuire:true, }
    ],
    amenities:[
        {
            type:String,
            require:true,
        }
    ],
    rating:{
        type:String,
        require:true,
    },
    address:{
        type:String,
        require:true,
    },
    price:{
        type:String,
        require:true,
    },
    image:{
        type:String,
        require:true,
    }
});
 const TURF = mongoose.model("Turf",turfSchema);
 module.exports = TURF;