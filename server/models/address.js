const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    name: {
        type: String,
        required: true
    },
    addressLine:{
        type:String,
        required:true
    },
    type:{
        type:String
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    pin: {
        type: String,
        required: true
    },
    primary: {
        type: Boolean,
        default: false,
        required: true
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('Address', addressSchema)