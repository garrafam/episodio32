import {Schema, model} from "mongoose";

const cartCollection= 'cars'

const cartSchema=new Schema({
    carritoId: String,
  products:[{
    
   product: { type: Schema.Types.ObjectId ,
           ref:'products'
    }, // ID del producto
    quantity: Number ,   // Cantidad 

}]})
cartSchema.pre(['find','findOne'], function(){
  this.populate('products.product')
});


export const carsModel = model(cartCollection, cartSchema)