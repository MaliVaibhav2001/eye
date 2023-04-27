const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength:3
    },
    number: {
        type: Number,
        required: true,
        min: 10
    },
    email:{
        type: String,
        required: true,
        validate(value){
            if(!validator.isEmail(value)) {
                throw new Error("Invalid email id")
            }
        }
    },
    message: {
        type: String,
        // required: true,
        minLength:3
    }
})

// Collection
const User = mongoose.model("User", userSchema);

module.exports = User;