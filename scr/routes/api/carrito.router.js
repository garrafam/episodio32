import { Router } from 'express'
import CartController from '../../controllers/carts.controller.js'
import TicketController from '../../controllers/ticket.controller.js';
import { passportCall } from '../../middlewares/passportCall.middleware.js';
import { authorization } from '../../middlewares/authorization.middleware.js';
const router=Router()

const {getCart,getCartBy,createCart,updateCart,deleteProductCart,deletCart}= new CartController();
const {createTicket}= new TicketController()
router.get('/', getCart )

router.get('/:cid',getCartBy)

router.post('/', createCart)

router.put('/:cid/products/:pid',updateCart)

router.delete('/:cid/products/:pid',deleteProductCart )

router.delete('/:cid',deletCart )

router.post('/:cid/purchase',passportCall('jwt'), createTicket)

export default router
