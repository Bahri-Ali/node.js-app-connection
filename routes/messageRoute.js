const express = require('express')
const messageRoute = express.Router()
const messageController = require('../controller/messageController')
app.get('/allMessages:idMessage', messageController.getAllMessages)

app.post('/newMessage' ,messageController.sendMessage)


module.exports = messageRoute