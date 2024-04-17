const socket=io()
socket.emit('addProduct',data=>{
console.log (data)
})

socket.on('getProducts',producto=>{
    const productbd= producto.find 
 })
