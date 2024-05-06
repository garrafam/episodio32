
const socket=io()
    
Swal.fire ({
   title:'Identifícate',
   input: 'text',
   text:'Ingresa el usuario para identificarte en el chat',
  inputValideitor:value =>{
      return !value && 'Necesitas escribir tu nombre para chatear'
   },
   allowOutsideClick: false
   
})

.then (result=>{
   user=result.value
   console.log('soy' ,user)
})
let chatBox=document.querySelector('#chatBox')
chatBox.addEventListener('keyup', evt => {
    if(evt.key==='Enter') {
        if(chatBox.value.trim().length > 0){
            socket.emit('message',{user,message:chatBox.value})
            console.log({user,message:chatBox.value})
            chatBox.value=''
        }
    }
})
socket.on('messageLogs', data=>{    
    console.log('esto es data',data)
   let log=document.getElementById('messageLog')
   let html=''   
   //Object.values(data).forEach(message=>{
    data.forEach(message=>{
   
        html+= `<li>${message.user}- dice ${message.message}</li> <br>`
        
    })
    
   log.innerHTML= html
})  