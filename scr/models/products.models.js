import {Schema, model} from "mongoose";

const userCollection= 'products'

const userSchema=new Schema({
    title : String,          
    description: String,
    price:Number    ,
    thumbnail: String,
    status: String,
        
    code:{
        
            type: String,
            required: true,
            unique:true
           
    },
    stock:Number  
    
    

})
export const productsModel = model(userCollection, userSchema)