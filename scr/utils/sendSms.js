import { objectConfig } from "../config/index.js";
import twilio from 'twilio'

const{twilio_token, twilio_phone, twilio_sid}=objectConfig

const client= twilio(twilio_sid, twilio_token)
export const sendSms= async()=>{
    return await client.messages.create({
        body:'este es un mensaje de prueba',
        from:twilio_phone,
        to:'+542920407054'
    })
}