import { Router } from 'express'
import ProductsController from '../../controllers/products.controller.js'


const router=Router()

const {getProducts,getProductById,addProduct,updateProducts,deleteProducts}= new ProductsController();

router.get('/', getProducts)

router.get('/:pid',getProductById )

router.post('/', addProduct )

router.put('/:pid',updateProducts )

router.delete('/:pid',deleteProducts)


export default router