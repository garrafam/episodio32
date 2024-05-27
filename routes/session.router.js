import {Router} from 'express'
import { UserManagerMongo } from '../scr/dao/userManagerMongo.js'
import{auth} from '../scr/middlewares/auth.middleware.js'
//import cookieRouter from '../routes/pruebas.router.js'
export const sessionRouter=Router()
const userServ= new UserManagerMongo

//router.get ('/setCookie', (req,res)=>{
//    res.cookie('codercookie','Esta es una coookie muy poderosa', {maxAge: 1000000}).send('cookie')
//})

sessionRouter.post('/register',async(req,res)=>{
    try{
    const {first_name, last_name, email, password}=req.body
    if( !email || !password) return res.status(401).send({status:'error',error:'hay que completar todos los datos '})
    const userExist= await userServ.getUserBy({email})
    if (userExist) return res.status(401).send({status:'error',error:'el usuario ya existe'})
     const newUsuario={
    first_name,
    last_name,
    email,
    password
    }
    const result= await userServ.createUser(newUsuario)
    res.cookie('codercookie',{first_name,last_name}, {maxAge: 1000000})
    res.send('usuario registrado')
}catch (error){
    console.log(error)

}

})


sessionRouter.post ('/login',async(req,res)=>{
    
    const{email,password}= req.body
    if( !email || !password) return res.status(401).send({status:'error',error:'hay que completar todos los datos '})
    
    
    //if (userFound.email=== 'adminCoder@coder' && userFound.password==='adminCod3r123') return userFound.role='admin'
    if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
        req.session.user = {
            email,
            admin: true
        }
        res.cookie('userName', 'Admin', { maxAge: 1000000 });
        console.log(req.session.user)
        return res.redirect('/products')
    }
        const userFound= await userServ.getUserBy({email,password})
    if (!userFound) return  res.status(401).send({status:'error',error:'el usuario no existe '})
    
        req.session.user={
        email,
        admin: //'false'
        userFound.role==='admin'
        }
        res.cookie('userName', 'user', { maxAge: 1000000 });
        console.log(req.session.user)
        res.redirect('/products' )
      
})
sessionRouter.get('/current',auth, (req,res)=>{
    res.send('datos sensibles')
})

sessionRouter.get('/logout',(req,res)=>{
    res.clearCookie('codercookie')
    req.session.destroy(err=>{ 
     if (err)return res.send({status:'error',error:err})
        else return res.redirect('/login')
    })
})