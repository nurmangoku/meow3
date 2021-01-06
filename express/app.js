const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv/config')
const Mew = require('../model/mewSchema')
const cors = require('cors')

mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology:true}, ()=>{
    console.log('Database terhubung')
})

const router = express.Router();

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.json())
app.use(cors())

app.get('/',(req,res)=>{
    res.render('client')
})

app.get('/mews',async (req,res)=>{
    try {
        const mews = await Mew.find()
        res.json(mews)
    } catch (err) {
        res.status(400).send(err)
    }
})

const isValidMew = (mew) =>{
    return mew.name && mew.name.toString().trim() !== '' && 
        mew.content && mew.content.toString().trim() !== ''
}

app.post('/mews',async (req,res)=>{
    try {
        if(isValidMew(req.body)){
            //insert to DB
            const mew = {
                name: req.body.name,
                content:req.body.content
            }
            const mewSaved = await Mew.create(mew)
            res.send(mewSaved)
            console.log(mewSaved);
        }else{
            res.status(422).json({
                message:'Hey!name and content required'
            })
        }

    } catch (err) {
        res.status(400).send(err)
    }
})

module.exports = app
