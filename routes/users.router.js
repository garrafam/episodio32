import { Router } from 'express'
const router=Router()
let users=[]



router.post('',(req,res)=>{
    const{first_name,last_name,email, password}=req.body
    
   if(!email|| !password) return res.send({status:'error',error:'faltan campos'})
    const newUser={
        id: users.length +1,
        first_name,
        last_name,
        email,
        password
    }    
    users.push(newUser)
    res.status(200).send({status:'success',payload :newUser})

})
router.get('/:uid',(req,res)=>{
    const{uid}=req.params
    const userId= users.find(user=>user.id===parseInt(uid))
    if (userId===false)return 'el usuario no existe'
     res.send({status:'success',payload :userId})

})
router.put('/:uid',(req,res)=>{
    const{uid}=req.params
    const userToUpdate=req.body
    const userIndex= users.findIndex( user=> user.id === parseInt(uid))    
    if (userIndex===-1)return res.status(404).send({status:'error' , error:'usuario no existe'}) 
    users[userIndex]={id:parseInt(uid), ...userToUpdate}    
    res.send({status:'success',payload :userToUpdate})
})
router.delete('/:uid',(req,res)=>{
    const{uid}=req.params
   const userResult= users.filter(user=>user.id !== parseInt(uid))
    users=userResult
    res.send({status:'success', payload:userResult})

})



export default router