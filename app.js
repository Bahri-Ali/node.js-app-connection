const express = require('express')
const userRoute = require('./routes/userRoute')
const messageRoute = require('./routes/messageRoute')
const app = express()
const connectDataBasse = require('./utils/connect')
connectDataBasse()

app.use(express.json())
app.use('/user' , userRoute)
app.use('/message',messageRoute)


app.listen(process.env.PORT , ()=>{

})
