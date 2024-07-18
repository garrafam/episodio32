import {Router} from 'express'
//import  UserDaoMongo  from '../../dao/MONGO/userDaoMongo.js'
//import CartDaoMongo from '../../dao/MONGO/cartDaoMongo.js'
import{auth} from '../../middlewares/auth.middleware.js'
import { createHash, isValidPassword } from '../../utils/bcrypt.js'
import passport from 'passport'
import { generateToken } from '../../utils/jwt.js'
import { passportCall } from '../../middlewares/passportCall.middleware.js'
import { authorization } from '../../middlewares/authorization.middleware.js'
import { cartService, productService, userService } from '../../service/index.js'

export const sessionRouter=Router()

sessionRouter.post('/register',async(req,res)=>{
const{first_name, last_name, password, email}=req.body

if(!password||!email)return res.status(401).send({status:'error', message:'debe ingresar todas las credenciales'})
    const userFound= await userService.getUser({email})
if (userFound) return res.status(401).send({status:'error', message:'el usuario con ese mail ya existe'})
    const carrito = await cartService.createCart()
    const newUser={
        first_name,
         last_name, 
         email, 
         role,
         password: createHash(password),
         cartId:carrito._id
    }
    const result= await userService.createUser(newUser)
    //datos que lleva el token
    const token=generateToken({
        first_name,
        last_name,
        email,
        id: result._id,
        cartId:carrito._id,
       
    })
    res.cookie('cookiesToken',token, {
        maxAge:60*60*1000,
        httpOnly: true

    }).send({status:'succes', message:'usuario registrado'})


   
})
sessionRouter.post('/login',async(req,res)=>{
    const{ password, email}=req.body

    if(!password||!email)return res.status(401).send({status:'error', message:'debe ingresar todas las credenciales'})
        const userFound= await userService.getUser({email})
    if(!isValidPassword(password,{password: userFound.password}))res.status(401).send({status:'error', message:'no coinciden  las credenciales'})
        const token=generateToken({
            first_name:userFound.first_name,
            email,
            id: userFound._id,
            cartId:userFound.cartId,
            role: userFound.role
        
        })
    res.cookie('cookiesToken',token, {
        maxAge:60*60*1000,
        httpOnly: true

    }).redirect('/products')//send({status:'succes', message:'usuario logueado'})
    
})           

sessionRouter.get('/current',passportCall('jwt'),authorization('user'), (req,res)=>{
    console.log(req.user)
    res.send( req.user.cartId)
    
})

sessionRouter.get('/logout',(req,res)=>{
    res.clearCookie('cookiesToken')
    res.status(200).json({ message: 'Logout successful' });
   // req.session.destroy(err=>{ 
   //  if (err)return res.send({status:'error',error:err})
   //     else return res.redirect('/login')
    
})