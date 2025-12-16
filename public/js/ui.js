let userId=document.getElementById("userId")
let messages= document.getElementById("messages");


function addMessage(data){
    let item=document.createElement('li');
    let itemid=document.createElement('li');
    itemid.classList.add("id");
     if(data.type === "text"){
    if(data.socketId===socket.id){
      item.classList.add("my-messages");
      
    }else{
      item.classList.add("others-messages");
       
    }
    
    item.innerHTML=` 
      <span>${data.message}</span>
      <span class="time">${data.time}</span>
    
    
    `
    }

    if(data.type ==="image"){
      item.innerHTML=`
         <img src="${data.image}" class="chat-image"/>
         <span class="time">${data.time}</span>
      `
    }
    itemid.textContent=data.socketId;
   
    messages.appendChild(itemid)
    messages.appendChild(item);
    
    window.scrollTo(0,document.body.scrollHeight);
  }