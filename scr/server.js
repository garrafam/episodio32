import express from 'express'

import ProductManagerMongo from './dao/productsManagerMongo.js'
import cartsRouter from '../routes/carrito.router.js'
import usersRouter from '../routes/user.router.js'
import productsRouter from '../routes/productos.router.js'
import { chatsModel } from './models/chats.models.js'
import {__dirname} from './utils.js'
import { uploader } from './utils.js'
import handlebars from 'express-handlebars'
import viewsRouter from '../routes/views.router.js'
import { productSocket } from '../utils/productsSocket.js'
import {Server as ServerIO} from 'socket.io'
import{Server as ServerHttp} from 'http'
import mongoose from 'mongoose'
import { error } from 'console'

//const path='./Product.json'
//const products= new ProductManager(path);
const products= new ProductManagerMongo();

const app= express()
const httpServer = new ServerHttp(app)
const io=new ServerIO(httpServer)

const PORT = process.env.PORT || 8080

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname+'/public'))
//mongoose.connect
mongoose.connect('mongodb+srv://garrafa2006:zML4OgtalsVuQJtL@cluster0.foflomd.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0')
console.log('base de datos conectada')
app.engine('hbs', handlebars.engine({
    extname:'.hbs'
}))
app.set('views', __dirname+'/views')
app.set('view engine', 'hbs')
//middl
app.use(productSocket(io))
app.use('/',viewsRouter)
app.use('/subir-archivo', uploader.single('myFile'), (req,res)=>{
    if (!req.file){
        return res.send('el archivo no se pudo subir')
    }
    res.send('archivo subido')

})
app.use('/api/carts',cartsRouter)
app.use('/api/products',productsRouter)
app.use('/api/user',usersRouter)
app.use((error,req,res,next)=>{
    console.log(error)
    res.status(500).send('Error 500 en el server io')
})
httpServer.listen(PORT, error=> {
    if (error)console.log(error)
    console.log('server escuchando en puerto 8080')
})


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
})
