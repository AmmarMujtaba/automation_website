import express from 'express'
import cors from 'cors'
import fetch from 'node-fetch'
const app = express()

app.use(cors({
    origin:'*'
}))

app.get('/on',(req,res) => {
    let response
    fetch('http://182.189.39.142:55555/on')
    .then((res) => {
        return res.text()
    })
    .then((text) => {
        res.send(text)
    })

    // res.send('normal response')
    // res.send('Server running AlhamdulILLAH')
})

app.listen(5555,() => {
    console.log('server listening on port 5555')
})