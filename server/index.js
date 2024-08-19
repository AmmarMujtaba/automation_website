const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors)

app.get('/on',(req,res) => {
    res.send('Server running AlhamdulILLAH')
})

app.listen(5555,() => {
    console.log('server listening on port 5555')
})