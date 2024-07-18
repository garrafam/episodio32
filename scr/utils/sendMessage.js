import { chatsModel } from '../dao/MONGO/models/chats.models.js'
import { productService } from '../service/index.js'
export const sendMessage=(io)=>{
io.on('connection', socket=>{
    console.log('nuevo cliente conectado')
    
   
    socket.on('getProducts',async () => {
        const {docs} = await productService.getProducts();
        //console.log('esto es productos',productos)
       const productos=docs
        socket.emit('productListUpdate', (productos));
        
    });  
    socket.on('message',async (data)=>{
        const result = await chatsModel.create(data)
        const messages= await chatsModel.find({})
       console.log ('esto es Chat',messages)
       
        
       
        io.emit('messageLogs',messages)
        
        
    })
})}