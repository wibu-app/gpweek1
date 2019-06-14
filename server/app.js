require('dotenv').config()
const errHandler = require('./helpers/errorHandler')
const app = express()
const port = 3000
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const router = require('./routes')

mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true})
.then(resp => {
    console.log('===== MONGODB CONNECTED =====')
})
.catch(err => {
    console.log('===== MONGODB CONNECTED FAILED =====')
})

app.use(express.urlencoded({ extended:false }))
app.use(express.json())
app.use(cors())

app.use('/', router)
app.use(errHandler)


app.listen(port,()=>{
    console.log('listening in port 3000');
    
})
