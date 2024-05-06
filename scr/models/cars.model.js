import {Schema, model} from "mongoose";

const userCollection= 'cars'

const userSchema=new Schema({
    carritoId: String,
  productos: [{
    id: { type:String }, // ID del producto
    quantity: { type: Number} // Cantidad del pr

}]})
export const carsModel = model(userCollection, userSchema)