const express = require('express')
const app = express()
const cors = require('cors')
import fetch from 'node-fetch'

app.use(cors({
    origin:'*'
}))

app.get('/on',(req,res) => {
    let response
    // fetch('http://39.42.240.101/on')
    // .then((res) => {
    //     return res.text
    // })
    // .then((text) => {
    //     res.send(text)
    // })

    res.send('Server running AlhamdulILLAH')
})

app.listen(5555,() => {
    console.log('server listening on port 5555')
})