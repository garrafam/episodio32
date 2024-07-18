import Router from 'express'
import TicketController from '../../controllers/ticket.controller.js'
import { passportCall } from '../../middlewares/passportCall.middleware.js'
import { authorization } from '../../middlewares/authorization.middleware.js'
const router=Router()
  
    
const { getTicket,getTicketBy,createTicket, updateTicket, deleteTicket } =new TicketController()
    
    router.get('/',passportCall('jwt'),authorization('admin'), getTicket)
    router.get('/:tid',passportCall('jwt'), getTicketBy)
    router.post('/', passportCall('jwt'),authorization('admin'),createTicket)
    router.put('/', updateTicket) 
    router.delete('/', deleteTicket)  
        
    export default router         