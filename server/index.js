const express = require('express')
const app = express()
const cors = require('cors')
const fetch = require('node-fetch')

app.use(cors({
    origin:'*',
    methods:['GET','POST'],
    allowedHeaders: ['Content-Type','Authorization']
}))

app.get('/on',(req,res) => {
    let response
    fetch('http://39.42.240.101/on')
    .then((res) => {
        return res.text
    })
    .then((text) => {
        res.send(text)
    })
})

app.listen(5555,() => {
    console.log('server listening on port 5555')
})