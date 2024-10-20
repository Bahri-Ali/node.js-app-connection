const express = require('express')
const Message = require('./modules/message')



const getAllMessages =  async(req , res)=>{
    const idMessage = req.params.idMessage
    const messages = await Message.findOne({id:idMessage})
    res.status(200).send(messages.messages)
} 
const sendMessage = async (req , res)=>{
    const message={
        From:req.body.from,
        To:req.body.to,
        Message:req.body.message
    }
    const To =await Message.findOne({id:req.body.to})
    To.messages.push(message)
    To.save()
    res.status(200).send('will done !')
}

module.exports = {
    getAllMessages,
    sendMessage
}