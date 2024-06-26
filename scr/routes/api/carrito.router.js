import { Router } from 'express'
import CartController from '../../controllers/carts.controller.js'

const router=Router()

const {getCart,getCartBy,createCart,updateCart,deleteProduct,deletCart}= new CartController();

router.get('/', getCart )

router.get('/:cid',getCartBy)

router.post('/', createCart)

router.put('/:cid/products/:pid',updateCart)

router.delete('/:cid/products/:pid',deleteProduct )

router.delete('/:cid',deletCart )

export default router