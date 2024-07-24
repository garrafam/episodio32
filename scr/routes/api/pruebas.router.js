import { Router } from "express";
import { sendMail } from "../../utils/sendMail.js";
import { userModel } from "../../dao/MONGO/models/user.models.js";
import { passportCall } from "../../middlewares/passportCall.middleware.js";
import { sendSms } from "../../utils/sendSms.js";
import { generateProducts } from "../../utils/generateProductsMocks.js";
import compression from 'express-compression'

const router=Router()
router.use(compression({
    brotli:{
        enabled: true,
        zlib:{}
    }
}))

router.get ('/setCookie', (req,res)=>{
    res.cookie('codercookie','Esta es una coookie muy poderosa ', {maxAge: 1000000}).send('cookie')
})
router.get ('/setCookieSigned', (req,res)=>{
    res.cookie('codercookie','Esta es una coookie muy poderosa ', {maxAge: 1000000, signed:true}).send('cookie signed')
})
router.get ('/getCookie', (req,res)=>{
    res.send(req.signedCookies)

})
router.get ('/deleteCookie', (req,res)=>{
    res.clearCookie('codercookie').send('cookie borrada')

})
router.get('/mail',passportCall('jwt'),async(req,res)=>{
    try{ 
        const{first_name, last_name, email}=req.user   
        sendMail({
        email:email,
        
        subject:'Email de prueba',
        html: `<div>
        <h1>Bienvenido ${first_name}</h1>
    </div>`
    })

        res.send('Email enviado a su casilla')

    }catch(error){
        console.log(error)
    }
})
router.get('/sms',passportCall('jwt'),async(req,res)=>{
    try{ 
        //const{first_name, last_name, email}=req.user   
        res.send('sms enviado ')
        sendSms()
    }       

    catch(error){
        console.log(error)
    }
})
router.get('/mockingproducts',async(req,res)=>{
    try{ let products= []
        for (let i =0; i <100; i++){
       

            products.push(generateProducts())
        }
        res.send({
            status:'success',
            payload: products
        })
       
        
    }       

    catch(error){
        console.log(error)
    }
})
router.get('/stringmuylargo', (req, res) => {
    let string='hola coder,soy un string ridiculamente largo'
    for(let i= 0; i< 5e4; i++){
        string += 'hola coder,soy un string ridiculamente largo'
    }
    res.status(200).send(string)
})
 
//pruebas con session
router.get('/session', (req,res)=>{
    if (req.session.counter){
        req.session.counter++
        res.send(`se ha visitado ${req.session.counter} veces a la pagina`)
    }
    else{
        req.session.counter=1
        res.send('Bienvenidos')
    }
})
//router.get('/logout', (req,res)=>{
//    req.session.destroy(err=>{
//        if(err)return res.send({status:'error', error:err})
//            else return res.send('logout')
//
//    })
//})
export default router