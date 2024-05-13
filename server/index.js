import express from 'express' ; 
import Room from './models/room.js'
import mongoose from 'mongoose';
import cors from 'cors' ; 
import { Server } from 'socket.io';
import http from 'http' ; 


const app = express() ; 
const server = http.createServer(app) ;
const io = new Server(server) ; 

app.use(express.json()) ; 
app.use(cors()) ; 
mongoose.connect('mongodb://localhost:27017/chat') ; 

// Replace the existing route with WebSocket communication
io.on('connection', (socket) => {
 

  
  socket.on('getRoomMessages', async () => {
    try {
      

      const room = await Room.findOne({ idroom: id });
     

      const messages = room.messages;
      socket.emit('roomMessages', messages);
    } catch (error) {
      socket.emit('error', { message: error.message });
    }
  });

  // Disconnect event
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});



app.get('/' , async  (req ,  res )=>{
      try {
      
        const data = await Room.find() ; 
          
        res.status(200).send(data) ;
        
      } catch (error) {
         res.status(400).send('you have an Error :' +error.message) ;
      } 
})


app.post('/room/create' , async (req, res )=>{
      const {idroom  ,roomName,  creator,DayCreated , locationCreated }= req.body ; 
      try {
        await Room.create({
            idroom:idroom ,
            roomName : roomName  , 
            creator : creator , 
            DayCreated : DayCreated , 
            locationCreated : locationCreated 
         })
         res.status(200).send('inserted suucessfuly :) ') ;
      } catch (error) {
        res.status(500).send({message : error.message}) ; 
      }
})
app.get('/room/message/:id' , async (req , res )=>{
  try {
    const id =parseInt(req.params.id) ;
     if (!id) {
         res.status(400).send('you should have an id room exists :=') ; 
     } 
     const data = await Room.find({idroom :id}) ; 
   
     if (data.length) {
        const messages = await Room.find({"idroom" :id} , {_id:0 , messages:1}) ; 
        res.status(201).json(messages) ; 
     }else{res.status(400).send("id not found check it plz :( !") ;}
    }catch(err){
      res.status(500).send(err) ; 
     }
})
app.post('/room/:id' ,async (req , res )=>{
    const id =parseInt(req.params.id) ;
     try {
        if (!id) {
            res.status(400).send('you should have an id room exists :=') ; 
        } 
        const data = await Room.find({"idroom" :id}) ; 
        if (data.length) {
             await Room.updateOne({"idroom" : id } , {
                $push:{
                    messages: {
                        idmsg : req.body.idmsg , 
                        content:req.body.content , 
                        senter : req.body.senter 
                    }
                }
             }) ;
             
             res.status(200).send("message sent :)") ;
        }
        else{res.status(400).send("id not found :( !") ;}
     } catch (error) {
        res.status(500).send(error.message) ; 
     }
   
})



server.listen(2005 , ()=>{
    console.log('server running :) ') ; 
})