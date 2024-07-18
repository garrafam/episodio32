import {Schema, model} from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const productsCollection= 'products'

const productSchema=new Schema({
    title : {
        type : String,
        index : true
    },          
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
productSchema.plugin(mongoosePaginate)
export const productModel = model(productsCollection, productSchema)