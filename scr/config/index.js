import { connect } from "mongoose";
import dotenv from 'dotenv'
import { program } from "../utils/commander.js";
import { MongoSingleston } from "../utils/MongoSingleston.js";

const {mode }= program.opts()
dotenv.config({
 path :mode==='production' ? './.env.production' : './.env.development'

})

export const objectConfig ={
  port:            process.env.PORT || 8080,
  mongo_url:       process.env.MONGO_URL,
  jwt_private_key: process.env.PRIVATE_KEY, 
  persistence:     process.env.PERSISTENCE,
  gmail_user:      process.env.GMAIL_USER,
  gmail_pass:      process.env.GMAIL_PASS,
  twilio_sid:      process.env.TWILIO_ACCOUNT_SID,
  twilio_token:    process.env.TWILIO_AUTH_TOKEN,
  twilio_phone:     process.env.TWILIO_PHONE


}

export const connectDb =async() => {
 //connect('mongodb://127.0.0.1:27017/ecommerce')  
  //connect(process.env.MONGO_URL)
  //console.log('base de datos conectada')
MongoSingleston.getInstance()
}
