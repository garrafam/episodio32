
import  {userService } from "../service/index.js"

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
    createUser =async (req, res) => {    
    try{
    const { first_name, last_name, email} = req.body
    // console.log(first_name, last_name, email, password)
    if(!email) return res.send({status: 'error', error: 'faltan campos'})
   
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
