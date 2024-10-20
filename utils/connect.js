const mongoose = require('mongoose')
const connectDataBasse = ()=>{
    try{
        mongoose.connect('mongodb+srv://alibahridev:.mongodb.net/')
        .then(()=>{console.log('we can connect')})
    }catch{
        console.log('problem here of login')
    }
    
}

module.exports = connectDataBasse
