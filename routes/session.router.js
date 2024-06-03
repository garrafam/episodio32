import {Router} from 'express'
import { UserManagerMongo } from '../scr/dao/userManagerMongo.js'
import{auth} from '../scr/middlewares/auth.middleware.js'
import { createHash, isValidPassword } from '../utils/bcrypt.js'
import passport from 'passport'
//import cookieRouter from '../routes/pruebas.router.js'
export const sessionRouter=Router()
const userServ= new UserManagerMongo

sessionRouter.get('/github', passport.authenticate('github',{scope:['user.email']}, async(req,res)=>{})),

sessionRouter.get('/githubcallback', passport.authenticate('github',{failureRedirect:'/login'}),(req,res)=>{
    req.session.user=req.user
    res.redirect('/products')
})

/*sessionRouter.post('/register',async(req,res)=>{
    try{
    const {first_name, last_name, email, password}=req.body
    if( !email || !password) return res.status(401).send({status:'error',error:'hay que completar todos los datos '})
    const userExist= await userServ.getUserBy({email})
    if (userExist) return res.status(401).send({status:'error',error:'el usuario ya existe'})
     const newUsuario={
    first_name,
    last_name,
    email,
    password: createHash(password)
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
        const userFound= await userServ.getUserBy({email})
    if (!userFound) return  res.status(401).send({status:'error',error:'el usuario no existe '})
    
       // const isValid= isValidPassword(password, {password: userFound.password})//retorna true o false
    
       if (!isValidPassword(password, {password: userFound.password}))return res.status(401).send({status:'error', error:'password incorrecto'})
    
    
        req.session.user={
        email,
        admin: //'false'
        userFound.role==='admin'
        }
        res.cookie('userName', 'user', { maxAge: 1000000 });
        console.log(req.session.user)
        res.redirect('/products' )
      
});*/

sessionRouter.post('/register', passport.authenticate('register',{failureRedirect:'/failregister'}), async (req , res) =>{
    res.redirect('/login')//.send({status:'success', message:'usuario registrado'})
})


sessionRouter.post('/failregister',(req,res)=>{
    console.log('fallo el registro')
    res.send({error:'fallo el registro '})
})


sessionRouter.post('/login', passport.authenticate('/login',{failureRedirect:'/faillogin'}),async(req,res)=>{
 if(!req.user) return res.status(400).send({status:'error', error:'credenciales invalidas'})
req.session.user={
    first_name:req.user.first_name,
    last_name:req.user.last_name,
    email:req.user.email
}
return res.redirect('/products');




})


sessionRouter.post('/faillogin',(req,res)=>{
    console.log('fallo el login')
    res.send({error:'fallo el login'})
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