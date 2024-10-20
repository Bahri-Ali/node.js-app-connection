const express = require('express')
const UserRoute = express.Router()
const userController = require('../controller/userController')



UserRoute.post('/newuser', userController.newUser)
UserRoute.post('/getConfirmationMail', userController.sendConfirmationEmail)
UserRoute.post('/confirmEmail/:token' ,userController.confirmEmail )
UserRoute.post('/login',userController.userLogin)
UserRoute.post('/update/information', userController.updateInformation)
UserRoute.post('/getRessetPassword', userController.getRessetPassword)
UserRoute.delete('/deletMyAccount/:Token',userController.deleteMyAccount)


module.exports = UserRoute