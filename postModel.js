const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const postSchema = new Schema({
    userId: {
        type:Number,
    },
    id:{
        type:Number,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    body:{
        type: String,
        required:true
    }
})

module.exports = mongoose.model('posts', postSchema);