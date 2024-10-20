const mongoose = require('mongoose')
const messageSchema = new mongoose.Schema({
    idMessage:{
        type:String,
    },
    messages:{
        type:Array
    },
})
const message = mongoose.model('message' ,messageSchema)
module.exports = message