export default class TicketRepository{

    constructor (ticketDao){
          this.ticketDao = ticketDao
    }
    getTicket=async()=>await this.ticketDao.getAll()
    getTicketBy=async(tid)=> await this.ticketDao.getBy(tid)    
    createTicket=async(newTicket)=>{
        if (!newTicket.products || newTicket.products.length === 0) {
            throw new Error('No products to create ticket');
        }

        console.log('Creating ticket with data:', newTicket); // Log para verificar los datos del ticket

        return await this.ticketDao.create(newTicket);
    }
    
    updateTicket=async(tid, ticketToUpdate)=>await this.ticketDao.update(tid,ticketToUpdate)    
    deleteTicket=async(tid)=>await this.ticketDao.deleteby(tid)
}