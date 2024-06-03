import { userModel } from "../models/user.models.js";


export class UserManagerMongo{
    constructor( ){
        this.userModel=userModel;
    }
    async getUser({limit=10 , numpage=1}){
        const user= await this.userModel.paginate({},{limit,page:numpage,sort,lean:true 
            
        })
        return user
    }
    async createUser(newUser){
        return await this.userModel.create(newUser)
    }
    async getUserBy(filter){
        return this.userModel.findOne(filter)
    }
}