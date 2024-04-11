import express from 'express'
import ProductManager from './productManager.js'
import cartsRouter from '../routes/carrito.router.js'
import productsRouter from '../routes/productos.router.js'
const path='./Product.json'
const products= new ProductManager(path);

const app= express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/carts',cartsRouter)
app.use('/api/products',productsRouter)


app.listen(8080,error=>(
    console.log('escuchando el puerto 8080')
    ))