import { chatsModel } from '../models/chats.models.js'
export const sendMessage=(io)=>{
io.on('connection', socket=>{
    console.log('nuevo cliente conectado')
    
   
    socket.on('getProducts',async () => {
        const productos = await products.getProduct();
        //console.log('esto es productos',productos)
        socket.emit('productListUpdate', (productos));
        
    });  
    socket.on('message',async (data)=>{
        const result = await chatsModel.create(data)
        const messages= await chatsModel.find({})
       console.log ('esto es Chat',messages)
       
        
       
        io.emit('messageLogs',messages)
        
        
    })
})}