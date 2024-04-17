import express from 'express'
import ProductManager from './productManager.js'
import cartsRouter from '../routes/carrito.router.js'
import productsRouter from '../routes/productos.router.js'
import {__dirname} from './utils.js'
import { uploader } from './utils.js'
import handlebars from 'express-handlebars'
import viewsRouter from '../routes/views.router.js'
import {Server} from 'socket.io'
const path='./Product.json'
const products= new ProductManager(path);

const app= express()
const httpServer=app.listen(8080,error=>{
    if (error)console.log(error)
    console.log('escuchando el puerto 8080')
    })

const socketServer=new Server(httpServer)    


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname+'/public'))
//app.get ('/',(req,res)=>{
//    res.status(200).send('<h1>hola soy marcos</h1>')
//})
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')

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

socketServer.on('connection', socket=>{
    console.log('nuevo cliente conectado')
    socket.on('message', data=>{
        console.log(data)
    })
    socket.emit('socket_individual','este mensaje solo lo debe recibir este socket')
    socket.broadcast.emit('para_todos_menos_el_actual','este mensaje lo veran todos los conectados menos este')
    socketServer.emit('eventos para todos','este mje lo recibiran todos ')
    socket.on('producto_actualizado',data=>{
        console.log('otro cliente conectado')
        console.log(data)
        
    })
    socket.emit('getProducts',(producto)=>{
        products.getProduct(producto)
    })

   // socket.on('addProduct', (producto) => {
    //    products.addProduct(producto);
   //     socket.emit('productListUpdated', products.getProduct());
   // });
})
