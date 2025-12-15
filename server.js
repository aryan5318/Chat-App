const {Server} = require('socket.io');
const {createServer}= require('http')
const express= require('express');
const {join}=require('path');
const app= express();

const Port=3000;
const server=createServer(app);

app.use(express.static("public"));

// intialize new instance of socket.io by passing server object
const io=new Server(server);


// Listen on the connection event for incoming sockets and log it to the console 

io.on('connection',(socket)=>{
    console.log("user connected");

// Each socket also fires a special disconnect event

    socket.on('disconnect',()=>{
        console.log("user disconnected");
    })
    socket.emit("welcome",{ 
      socketId:socket.id
    }
    )
     socket.on('chat message', (data) => {
    console.log('message: ' + data);

// sending message to every one including the sender;
    io.emit("chat message", {
      message: data.message,
      socketId: socket.id // trusted from server
    });
    
  });
})


server.listen(Port,()=>{
    console.log(`server is running at port ${Port}`)
})
