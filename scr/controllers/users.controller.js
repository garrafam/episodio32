
import { CustomError } from "../service/errors/customError.js"
import { generateUserError } from "../service/errors/info.js"
import  {userService } from "../service/index.js"
import { EError } from "../service/errors/enums.js"

class UserController{
    constructor(){
       this.userService=  userService

    }
getUsers   =async (req, res) => {
    try{
    const users = await this.userService.getUsers()
    res.send(users)
    } catch(error){
        console.log ('error')
    }
}
getUser    =async (req, res) => {
    try{
    const user = await this.userService.get(filter)
    res.send(user)
    }catch(error){
        console.log('error')
    }
}
    createUser =async (req, res, next) => {    
    try{
    const { first_name, last_name, email} = req.body
    // console.log(first_name, last_name, email, password)
   // if(!email) return res.send({status: 'error', error: 'faltan campos'})
      if(!first_name||!last_name||!email){
        CustomError.createError({
            name:'Error al crear un usuario',
            cause: generateUserError({first_name, last_name, email}),
            message:'Error al crear un usuario',
            code:EError.INVALID_TYPES_ERROR

     

        })
      }
    // persistencia en mongo -> atlas
    const newUser ={
        first_name,
        last_name,
        email,
        password
        
    }
  
    const result = await this.userService.create(newUser)
    // validar el result
    res.status(200).send({ status: 'success', payload: result })
}catch(error){
    console.log('error')
    next(error)
}
}
updateUser = async (req, res) => {
    try{
    const { uid } = req.params
    const { first_name, last_name, email} = req.body    
    if(!first_name,!last_name, !email) return res.send({status: 'error', error: 'faltan campos'})   
  
    const result = await this.userService.update( uid, req.body)    

    res.send({status: 'success', payload: result})
}catch(error){console.log('error')}

}
deleteUser =async (req, res) => {
    try{
    const { uid } = req.params    
    const result = await this.userService.delete({_id: uid})
    res.send({status: 'success', payload: result})
    }catch(error){
        console.log('error')
    }
}




    
}
export default UserController
