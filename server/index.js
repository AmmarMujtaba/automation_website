import express from 'express'
import cors from 'cors'
import fetch from 'node-fetch'
import {MongoClient} from 'mongodb'
const app = express()

app.use(cors())

const dbUri = 'mongodb+srv://ammar:ammar786@atlascluster.8drgp.mongodb.net/'
const client = new MongoClient(dbUri)
await client.connect()
const collection = client.db('myDB').collection('cardiology')

app.get('/example',async (req,res) => {
    //find ip from database
    const data = await collection.findOne({"_id":1})

    const response = {value: 'text value'}

    res.send(response)
})
app.get('/on',async (req,res) => {
    //find ip from database
    const data = await collection.findOne({"_id":1})

    const response = await fetch(`http://${data.ip}/on`)
    if(!response.ok){
        res.send("Response not ok")
    }
    const text = await response.text()

    res.send(text)
})
app.get('/off',async (req,res) => {
    //find ip from database
    const data = await collection.findOne({"_id":1})

    const response = await fetch(`http://${data.ip}/off`)
    if(!response.ok){
        res.send("Response not ok")
    }
    const text = await response.text()

    res.send(text)
})
app.get('/changeip',async (req,res) => {
    const newIp = req.query.ip

    //update the ip in database
    const status = await collection.updateOne({"_id":1},{$set:{'ip':newIp}})

    res.send(`ipChanged:${newIp}`)
})
app.get('/reqstat',async (req,res) => {
    //find ip from database
    const data = await collection.findOne({"_id":1})
    
    //fetch fan status from esp
    const response = await fetch(`http://${data.ip}/reqstat`)
    if(!response.ok){
        res.send("Response not ok")
    }
    const text = await response.text()

    res.send(text)
})
app.get('/changemode',async (req,res) => {
    //find ip from database
    const data = await collection.findOne({"_id":1})
    
    //fetch fan status from esp
    const response = await fetch(`http://${data.ip}/changemode`)
    if(!response.ok){
        res.send("Response not ok")
    }
    const text = await response.text()

    res.send(text)
})

app.listen(443,() => {
    console.log('server listening on port 443')
})