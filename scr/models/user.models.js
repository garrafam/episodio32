import {Schema, model} from "mongoose";

const userCollection= 'usuarios'

const userSchema=new Schema({
    first_name:String,
    last_name: String,
    email:{
        type: String,
        required: true,
        unique:true
    }

})
export const userModel = model(userCollection, userSchema)