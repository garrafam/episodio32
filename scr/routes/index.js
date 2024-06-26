import { Router } from "express"
import viewsRouter from './views.router.js'
import cartsRouter from './api/carrito.router.js'
import usersRouter from './api/user.router.js'
import pruebasRouter from './api/pruebas.router.js'
import productsRouter from './api/products.router.js'
import {sessionRouter} from './api/session.router.js'
import { uploader } from '../utils.js'
const router= Router()


router.use('/subir-archivo', uploader.single('myFile'), (req,res)=>{
    if (!req.file){
        return res.send('el archivo no se pudo subir')
    }
    res.send('archivo subido')

})
router.use('/',viewsRouter)
router.use('/api/session', sessionRouter )
router.use('/',pruebasRouter)
router.use('/api/carts',cartsRouter)
router.use('/api/products',productsRouter)
router.use('/api/user',usersRouter)
router.use((error,req,res,next)=>{
    console.log(error)
    res.status(500).send('Error 500 en el server io')
})
export default router