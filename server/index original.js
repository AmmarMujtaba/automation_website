import express from 'express'
import cors from 'cors'
import fetch from 'node-fetch'
import {MongoClient} from 'mongodb'
import { Realtime } from 'ably'

const app = express()
app.use(cors())

const dbUri = 'mongodb+srv://ammar:ammar786@atlascluster.8drgp.mongodb.net/'
const mongoClient = new MongoClient(dbUri)
// await mongoClient.connect()
const collection = mongoClient.db('myDB').collection('cardiology')

app.get('/',(req,res) => {
    res.send("server is ok")
})
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
app.get('/updateclient',async (req,res) => {
    const message = req.query.message

    console.    log('inside handler')
    const ably = new Realtime('gf7lDA.lZTm9A:OO2S5MaOGvSDbF5_atGjC6_B9UGlwqnbEEYR1OmHWFA')
    await ably.connection.once('connected')
    console.log('ably is connected')

    const channel = await ably.channels.get('roomautomation')
    console.log('channel accessible')
    
    channel.publish('arduino',message)

    //send back response
    res.send('updated')
})

app.listen(443,() => {
    console.log('server listening on port 443')
})
