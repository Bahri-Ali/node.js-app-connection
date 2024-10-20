const express = require('express')
const User = require('../modules/user')
const Message = require('../modules/message')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt')



const newUser = async(req,res)=>{
    const newUser= await new User(req.body)
    const isNewMail = await User.findOne({Email:req.body.Email})
    if(isNewMail){
        return res.status(300).send('Email is used')
    }
    try{
        const payload = {
            Name:newUser.Name,
            Email:newUser.Email
        }
        const Token = await jwt.sign(payload , `${process.env.JWT_KEY}`)
        newUser.Password =await bcrypt.hash(newUser.Password ,process.env.PssswordHasch )
        newUser.Token = Token
        const userMessage =await new Message()
        newUser.IdMessage= Math.floor(Math.random()*909898980987*Math.random())
        userMessage.idMessage=newUser.IdMessage
        newUser.save()
        userMessage.save()
        res.status(200).send(newUser.Token)     
    }catch(err){
        res.status(300).send(err)
    }
}
const sendConfirmationEmail = async(req,res )=>{
    const user = await User.findOne({Name:req.body.Name})
    const link = `/user/gccemail/${user.Token}`
    if(!user){return res.send('user not fond')}
    try{
        const transporter = nodemailer.createTransport({
            service:'gmail',
            auth: {
                user: "ali.bahri.dev@gmail.com",
                pass: `${process.env.mailPass}`,
            },
        })
        const codeConfirmation = Math.floor(Math.random()*9999)
        const info = await transporter.sendMail({
            from: 'ali.bahri.dev@gmail.com',
            to: `${user.Email}`,
            subject: "confirmation Email ENG",
            text: ``,
            html: `hello ${(user.Name)} to confirm  your mail  <a href='${codeConfirmation}'>click here</a>`
        })
        res.status(200).send('')
    }
    catch{
        res.status(300).send('server crach')
    }
}
const confirmEmail = async(req , res)=>{
    const token = window.location.search
    const user = await User.findOne({Token:token})
    if(!user){return res.status(300).send('user not find')}
    try{
        await user.updateOne({
            verify:true
        })
        res.status(200).send('don!')
    }catch{
        res.status(300).send('server crach try again')
    }
    // this is not http req we will add this function to frontEnd project
}
const userLogin = async (req , res)=>{
    const user =await User.findOne({Email:req.body.Email}) 
    if(!user) return res.status(300).send('email or password are not correct')
    const verifyPassword = await bcrypt.compare(req.body.Password , user.Password)
    if(!verifyPassword)  return res.status(300).send('email or password are not correct')
    res.status(200).send(user.Token)
}
const getRessetPassword = async(req,res)=>{
    const user = await User.findOne({Token:req.body.Token})
    if(!user) {return res.status(401).send('user not find')}
    const Link = `/user/resetPassword/${user.Token}`
        try{
            const transporter =await nodemailer.createTransport({
                service:'gmail',
                auth: {
                    user: "ali.bahri.dev@gmail.com",
                    pass: `${env.process.mailPass}`,
                },
            })
            const info = await transporter.sendMail({
                from: 'ali.bahri.dev@gmail.com',
                to: `${user.Email}`,
                subject: "Resset Password ENG",
                text: ``,
                html: ``
            })
            res.status(200).send('you get it')
        }catch(err){
            res.status(300).send("err")
        }
}
const updateInformation = async (req,res)=>{
    try{
        const user = await User.findOne({Token:req.body.Token})
        console.log(user)
        const userInfoUbdat = req.body
        await user.updateOne({
            Name:`${req.body.Name}`,
            Email:`${req.body.Email===null?User.Email:req.body.Email}`,
        })
        const payload = {user}
        const NewToken = await jwt.sign(payload , env.process.JWT_KEY)
        await user.updateOne({Token:NewToken})
        consoe.log(user)
        res.send(user)
    }catch(err){
        res.send(err)
    }
}
const deleteMyAccount = async(req,res)=>{
    try{
        const user = User.findOne({Token:req.params.Token})
        if(!user) return res.status(300).send('user not find')
        const isPasswordCorrect = await bcrypt.compare(req.body.Password , user.Password)
        if(!isPasswordCorrect) return res.status(300).send('password not correct')
        await Message.findByIdAndDelete({idMessage:user.idMessage})
        await User.findOneAndDelete({Token:req.params.Token})
        res.status(200).send('user delete')
    }catch(err){
        res.status(400).send(err)
    }
}



module.exports = {
    newUser,
    sendConfirmationEmail,
    confirmEmail,
    userLogin,
    getRessetPassword,
    updateInformation,
    deleteMyAccount,
}