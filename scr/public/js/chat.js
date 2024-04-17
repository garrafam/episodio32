const socket=io()
socket.emit('message','esto data en forma de string')
socket.on('socket_individual',data=>{
    console.log(data) 
 })
socket.on('para_todos_menos_el_actual',data=>{
    console.log(data) 
 })
 socket.on('eventos para todos',data=>{
    console.log(data) 
 })