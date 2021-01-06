const mongoose = require('mongoose');

const mewSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    }
}, {timestamps: true}) 

const Mew = mongoose.model('mew', mewSchema);

module.exports = Mew