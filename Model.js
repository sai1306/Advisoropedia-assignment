const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    email: {
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String
    },
    profile:{
        type: String,
        enum: ['image/jpeg', 'image/png', 'image/gif'],
    }
})

module.exports = mongoose.model('User', userSchema);