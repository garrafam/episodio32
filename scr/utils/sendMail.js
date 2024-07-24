import nodemailer from 'nodemailer'
import { objectConfig } from '../config/index.js'

const {gmail_pass, gmail_user} = objectConfig
const transport=nodemailer.createTransport({
    service : 'gmail',
    port: 587,
    auth:{
        user:gmail_user,
        pass:gmail_pass
    }
})



export const sendMail=async({email,subject,html})=>{
 
    return await transport.sendMail({
        from : 'codertest <garrafam123@gmail.com>',
        to : email,
        subject,
        html,
        attachments:[{
            filename:'gato.png',
            path: './scr/public/image/gato.png',
            cid:'gato'

        }]
    })
}