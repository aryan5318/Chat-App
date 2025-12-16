let form=document.getElementById("form");
let input=document.getElementById("input");
let ImageInput=document.getElementById("ImageInput");
 
form.addEventListener('submit',function(e){
    e.preventDefault();
    if(input.value || ImageInput.files[0]){
      const file=ImageInput.files[0];
      if(file){
        const reader= new FileReader();
        reader.onload =()=>{
          socket.emit("chat message",{
             type:"image" ,
             image:reader.result,
             socketId:socket.id,
             time:new Date().toLocaleTimeString([],{
              hour:'2-digit',
              minute:'2-digit',
             })


          })
        }
        reader.readAsDataURL(file);
      }
      if(input.value){ 
      const data={
        type:"text",
        message:input.value,
        socketId:socket.id,
        time:new Date().toLocaleTimeString([],{
          hour:'2-digit',
          minute:'2-digit',
        })
      }
      socket.emit('chat message',data);
      input.value= '';
    }
    }
  })
socket.on("chat message",(data)=>{
    addMessage(data);
})
  socket.on("welcome",(data)=>{
     let item=document.createElement('li');
     item.textContent=data.socketId;
     userId.appendChild(item);

  })