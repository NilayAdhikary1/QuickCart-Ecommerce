import mongoose from "mongoose";
import { reviewSchema } from "./ReviewModel.js";


const { Schema } = mongoose;

const productSchema = new Schema({
    user : {
        // this gives an information about which admin user created the product...
        type : Schema.Types.ObjectId,
        required : true,
        ref : "User", // we need to mention from which collection or from which class(Model) this is coming from. that is why we used ref.
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
        required: true,
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
    numReviews : {
        type : Number,
        required : true,
        default : 0
    },
    reviews : [reviewSchema] // so we can save the records of multiple reviews related to this product. For multiple reviews, we used array of reviewSchema...
}, {
    timestamps : true
});


export const Product = mongoose.model('Product', productSchema);
