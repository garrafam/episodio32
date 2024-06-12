import { userModel } from "../models/user.models.js";


export class UserManagerMongo{
    constructor( ){
        this.userModel=userModel;
    }
    getUser=async filter =>await this.userModel.findOne(filter)
       
        
  
    async createUser(newUser){
        return await this.userModel.create(newUser)
    }
    async getUserBy(filter){
        return this.userModel.findOne(filter)
    }
}