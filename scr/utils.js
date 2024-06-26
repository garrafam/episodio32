import {fileURLToPath  }from 'url'
import {dirname} from 'path'
import multer from 'multer'
import ProductManagerMongo from './dao/productsDaoMongo.js'
const products=new ProductManagerMongo()
const __filename= fileURLToPath(import.meta.url)
export const __dirname= dirname(__filename)

const storage= multer.diskStorage({
    destination:function (req,file,cb){
        cb(null,__dirname+ '/public/upLoads')
    },
    filename:function(req,file,cb){
        cb(null,`${Date.now()}-${file.originalname}`)
    }
})

//function obtenerProductosMiddleware(req, res, next) {
//    const productos = products.getProduct();     // Suponiendo que obtienes los productos de productManager
 //   res.locals.productos = productos;
 //   next();
//}



//export default obtenerProductosMiddleware


export const uploader= multer({storage})