import { userModel } from "./models/user.models.js";


 class UserManagerMongo{
    constructor( ){
        this.userModel=userModel;
    }
    getAll=async ( )=> await this.userModel.find()
    getBy=async (filter )=> await this.userModel.findOne(filter)       
  
    create=async (newUser)=>{
        return await this.userModel.create(newUser)
    }
     update=async(uid,userToUpdate)=>{
        return await this.userModel.findByIdAndUpdate({_id:uid},userToUpdate)
    }
     delete=async(filter)=> await this.userModel.deleteOne(filter )
     
}
export default UserManagerMongo