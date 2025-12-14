const {Server} = require('socket.io');
const {createServer}= require('http')
const express= require('express');
const {join}=require('path');
const app= express();

const Port=3000;
const server=createServer(app);

// intialize new instance of socket.io by passing server object
const io=new Server(server);
app.get('/',(req,res)=>{
    res.sendFile(join(__dirname,'index.html'))
})

// Listen on the connection event for incoming sockets and log it to the console 

io.on('connection',(socket)=>{
    console.log("user connected");

// Each socket also fires a special disconnect event

    socket.on('disconnect',()=>{
        console.log("user disconnected");
    })
     socket.on('chat message', (msg) => {
    console.log('message: ' + msg);

// sending message to every one including the sender;
    io.emit('chat message',msg);
    
  });
})


server.listen(Port,()=>{
    console.log(`server is running at port ${Port}`)
})
