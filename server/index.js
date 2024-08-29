import express from 'express'
import cors from 'cors'
import fetch from 'node-fetch'
import {MongoClient} from 'mongodb'
import { Server } from 'socket.io'
import http from 'http'

const app = express()
app.use(cors())

const dbUri = 'mongodb+srv://ammar:ammar786@atlascluster.8drgp.mongodb.net/'
const mongoClient = new MongoClient(dbUri)
await mongoClient.connect()
const collection = mongoClient.db('myDB').collection('cardiology')

const httpServer = http.createServer()
const socketServer = new Server(httpServer,{
    cors: {origin: '*'}
})
socketServer.on('connection', (socket) => {
    socket.emit('established', 'message from server')
})
httpServer.listen(5555, () => {
    console.log('server is listening')
})

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
    
    //ex
    // if(client != null){
    //     if(client.readyState == WebSocket.OPEN){
    //         client.send("s=> ",text)
    //     }
    // }    
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
app.get('/updateClient',async (req,res) => {
    const message = req.query.message
    if(client != null){
        if(client.readyState == WebSocket.OPEN){
            client.send(message)
        }
    }
})

// app.listen(443,() => {
//     console.log('server listening on port 443')
// })
