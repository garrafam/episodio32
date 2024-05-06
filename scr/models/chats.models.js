import {Schema, model} from "mongoose";

const userCollection= 'messages'

const userSchema=new Schema({
    user:String,
    message:String
   
    

})
export const chatsModel = model(userCollection, userSchema)