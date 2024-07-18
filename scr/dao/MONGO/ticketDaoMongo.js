import {ticketModel } from "./models/tickets.model.js";


 class TicketDaoMongo{
    constructor( ){
        this.ticketModel=ticketModel;
    }
    getAll=async ( )=> await this.ticketModel.find()
    getBy=async (tid )=> {
       return await this.ticketModel.findOne({_id:tid}) 
       //.populate('user')
      // .populate('products.product');
    }      
  
    create=async (newTicket)=>{
       const createdTicket= await this.ticketModel.create(newTicket)
        console.log('Ticket created:', createdTicket);
        return createdTicket
    }
     update=async(tid,ticketToUpdate)=>{
        return await this.ticketModel.findByIdAndUpdate({_id:tid},ticketToUpdate)
    }
     delete=async(filter)=> await this.ticketModel.deleteOne(filter )
     
}
export default TicketDaoMongo