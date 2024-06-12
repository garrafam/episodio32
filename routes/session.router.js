import {Router} from 'express'
import { UserManagerMongo } from '../scr/dao/userManagerMongo.js'
import CarManagerMongo from '../scr/dao/carManagerMongo.js'
import{auth} from '../scr/middlewares/auth.middleware.js'
import { createHash, isValidPassword } from '../utils/bcrypt.js'
import passport from 'passport'
import { generateToken } from '../utils/jwt.js'
import { passportCall } from '../scr/middlewares/passportCall.middleware.js'
import { authorization } from '../scr/middlewares/authorization.middleware.js'

export const sessionRouter=Router()
const userServ= new UserManagerMongo
const carServ= new CarManagerMongo

//sessionRouter.get('/githubcallback', passport.authenticate('github',{failureRedirect:'/login'}),(req,res)=>{
//    req.session.user=req.user
//    res.redirect('/products')
//})
sessionRouter.post('/register',async(req,res)=>{
const{first_name, last_name, password, email}=req.body

if(!password||!email)return res.status(401).send({status:'error', message:'debe ingresar todas las credenciales'})
    const userFound= await userServ.getUser({email})
if (userFound) return res.status(401).send({status:'error', message:'el usuario con ese mail ya existe'})
    const carrito = await carServ.createCart()
    const newUser={
        first_name,
         last_name, 
         email, 
         password: createHash(password),
         cartId:carrito._id
    }
    const result= await userServ.createUser(newUser)
    const token=generateToken({
        email,
        id: result._id
    })
    res.cookie('cookiesToken',token, {
        maxAge:60*60*1000*24,
        httpOnly: true

    }).send({status:'succes', message:'usuario registrado'})


   
})
sessionRouter.post('/login',async(req,res)=>{
    const{ password, email}=req.body

    if(!password||!email)return res.status(401).send({status:'error', message:'debe ingresar todas las credenciales'})
        const userFound= await userServ.getUser({email})
    if(!isValidPassword(password,{password: userFound.password}))res.status(401).send({status:'error', message:'no coinciden  las credenciales'})
        const token=generateToken({
            email,
            id: userFound._id,
            role: userFound.role
        })
    res.cookie('cookiesToken',token, {
        maxAge:60*60*1000*24,
        httpOnly: true

    }).send({status:'succes', message:'usuario logueado'})
})

sessionRouter.get('/current',passportCall('jwt'),authorization('user'), (req,res)=>{
    res.send('datos sensibles')
})

sessionRouter.get('/logout',(req,res)=>{
    res.clearCookie('codercookie')
    req.session.destroy(err=>{ 
     if (err)return res.send({status:'error',error:err})
        else return res.redirect('/login')
    })
})