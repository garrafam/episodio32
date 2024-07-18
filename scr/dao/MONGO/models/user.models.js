import {Schema, model} from "mongoose";

const userCollection= 'usuarios'

const userSchema=new Schema({
    first_name:String,
    last_name: String,
    email:{
        type: String,
        required: true,
        unique:true
    },
    password: String,
    role:{
        type: String,
        enum: ['user','user_premiun', 'admin'],
        default: 'user'
    },
    cartId:{
        type:Schema.ObjectId,
        ref: 'carts'
    }

})
export const userModel = model(userCollection, userSchema)