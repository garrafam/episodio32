import { Router } from 'express'
import ProductsController from '../../controllers/products.controller.js'
import { passportCall } from '../../middlewares/passportCall.middleware.js';
import { authorization } from '../../middlewares/authorization.middleware.js';
const router=Router()

const {getProducts,getProductBy,addProduct,updateProduct,deleteProduct}= new ProductsController();

router.get('/', getProducts)

router.get('/:pid',getProductBy )

router.post('/',addProduct )

router.put('/:pid',passportCall('jwt'),authorization('user'),updateProduct )

router.delete('/:pid',passportCall('jwt'),authorization('user'),deleteProduct)


export default router