import { userModel } from "../models/user.models.js";


 class UserManagerMongo{
    constructor( ){
        this.userModel=userModel;
    }
    getUsers=async ( )=> await this.userModel.find()
    getUser=async (filter )=> await this.userModel.findOne(filter)       
  
    createUser=async (newUser)=>{
        return await this.userModel.create(newUser)
    }
     getUserBy=async(filter)=>{
        return await this.userModel.findOne(filter)
    }
     deleteUser=async(filter)=> {await this.userModel.deleteOne(filter )
     }
}
export default UserManagerMongo