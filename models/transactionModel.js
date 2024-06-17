const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
    userid:{
        type:String,
        required:true,
    },
    amount:{
        type:Number,
        required:true,
    },
    type: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        requires: true,
    },
        refrence: {
        type: String,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
},
{
    timestamps:true,
});

const transactionModel = mongoose.model('transaction', transactionSchema)

module.exports = transactionModel;