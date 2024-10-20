const { verify } = require('jsonwebtoken')
const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    Name:{
        type:String,
    },
    Email:{
        type:String
    },
    Password:{
        type:String
    },
    IdMessage:{
        type:String
    },
    img:{
        type:String
    },
    Token:{
        type:String
    },
    verify:{
        type:Boolean, 
        default:false
    }

})
const user = mongoose.model('user' ,userSchema)
module.exports = user