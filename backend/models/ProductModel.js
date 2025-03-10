import mongoose from "mongoose";

const { Schema } = mongoose;

const productSchema = new Schema({
    user : {
        // this gives an information about which admin created the product...
        type : Schema.Types.ObjectId,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required: trusted,
    },
    brand : {
        type : String,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true,
        default : 0 
    },
    countInStock : {
        type : Number,
        required : true
    },
    rating : {
        type : Number,
        default : 0,
        required : true
    },
    numreviews : {
        type : Number,
        required : true,
        default : 0
    },
    reviews : [reviewSchema]
});