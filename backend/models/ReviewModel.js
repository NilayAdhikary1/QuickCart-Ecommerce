
import mongoose from "mongoose";
const { Schema } = mongoose;

export const reviewSchema  = new Schema({
    user : {
        // this gives an information about which User reviewed this...
        // a normal user can review this product as well as an admin who created this product can also review this.
        type : Schema.Types.ObjectId,
        required : true,
        ref : "User"
    },
    rating : {
        type : Number,
        required : true,
        min: 1, 
        max: 5
    },
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    }
}, {
    timestamps : true
});

 const Review = mongoose.model('Review', reviewSchema);