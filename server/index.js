import express from 'express'
import cors from 'cors'
import fetch from 'node-fetch'
import {MongoClient, mongoClient} from 'mongodb'
const app = express()

app.use(cors({
    origin: '*'
}))

const dbUri = 'mongodb+srv://ammar:ammar786@atlascluster.8drgp.mongodb.net/'

const client = new MongoClient(dbUri)

app.get('/on',(req,res) => {
    let response
    fetch('http://182.189.39.142:5555/on')
    .then((res) => {
        return res.text()
    })
    .then((text) => {
        res.send(text)
    })
})
app.get('/off',(req,res) => {
    let response
    fetch('http://182.189.39.142:5555/off')
    .then((res) => {
        return res.text()
    })
    .then((text) => {
        res.send(text)
    })
})
app.get('/changeip',async (req,res) => {
    const newIp = req.query.ip

    //connect with database
    const db = await client.connect()

    //change ip in the database
    const collection = db('myDB').collection('cardiology')
    const status = collection.updateOne({},{'ip':newIp})
})

app.listen(5555,() => {
    console.log('server listening on port 5555')
})