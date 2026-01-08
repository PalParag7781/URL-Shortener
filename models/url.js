const mongoose = require('mongoose')

const urlschema = new mongoose.Schema({
    shortId:{
        type:String,
        required:true,
        unique:true
    },
    redirectURL:{
        type:String,
        required:true,
      
    },
    visitHistory:[{timestamp:{type:Number}}]
},{
    timestamps:true
})

const URLmodel = mongoose.model('URL',urlschema)


module.exports = URLmodel
