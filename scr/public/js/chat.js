const socket=io()
//<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
//Swal.fire ({
//   title:'Identifícate',
//   input: 'text',
//   text:'Ingresa el usuario para identificarte en el chat',
//   inputValideitor:value =>{
//      return !value && 'Necesitas escribir tu nombre para chatear'
//   },
//   allowOutsideClick: false
//})
//.then (result=>{////
 //  user=result.value
 //  console.log(user)
//})

 const input = document.getElementById('chatBox')
 const messageList= document.getElementById('messageLog')
 input.addEventListener('keyup', evt=>{
    if(evt.key==='Enter'){
        socket.emit('mensaje_cliente', input.value)
        input.value=''

    }
 })
 socket.on('messages_server',data=>{
    console.log('esto es el cliente',data)
 })


//socket.emit('message','esto data en forma de string')
//socket.on('socket_individual',data=>{
//    console.log(data) 
 //})
//socket.on('para_todos_menos_el_actual',data=>{
    //console.log(data) 
 //})
 //socket.on('eventos para todos',data=>{
    //console.log(data) 
 //})