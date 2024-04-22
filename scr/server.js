import express from 'express'
import ProductManager from './productManager.js'
import cartsRouter from '../routes/carrito.router.js'
import productsRouter from '../routes/productos.router.js'
import {__dirname} from './utils.js'
import { uploader } from './utils.js'
import handlebars from 'express-handlebars'
import viewsRouter from '../routes/views.router.js'
import {Server} from 'socket.io'
import { productSocket } from '../utils/productsSpcket.js'

const path='./Product.json'
const products= new ProductManager(path);

const app= express()
const httpServer=app.listen(8080,error=>{
    if (error)console.log(error)
    console.log('escuchando el puerto 8080')
    })

const io=new Server(httpServer)    


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname+'/public'))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')
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
app.use((error,req,res,next)=>{
    console.log(error)
    res.status(500).send('Error 500 en el server')
})
 let messages=[]
 io.on('connection', socket=>{
    console.log('nuevo cliente conectado')
    
   
    socket.on('getProducts',async () => {
        const productos = await products.getProduct();
        socket.emit('productListUpdate', productos);
        
    });  
    socket.on('message',data=>{
        console.log('message data:' ,data)
        messages.push(data)
        io.emit('messageLogs', messages)
    })
})
