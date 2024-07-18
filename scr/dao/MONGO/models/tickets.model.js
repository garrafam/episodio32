import {Schema, model} from 'mongoose'

const ticketCollection = 'tickets'

const ticketSchema = new Schema({  
    user: {
        type: Schema.Types.ObjectId,
        ref: 'usuarios'
    },
    products: [{
        
            
                product: {
                    type: Schema.Types.ObjectId,
                    ref: 'products',
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true
                }
            
        
    }],
    totalPrice: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }   

})

ticketSchema.pre(['find','findOne'], function(){
    this.populate('products.product')
})  
export const ticketModel = model(ticketCollection, ticketSchema)

