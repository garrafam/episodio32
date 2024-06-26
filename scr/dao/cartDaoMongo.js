
import { carsModel } from "../models/carts.model.js";
import ProductManagerMongo from "./productsDaoMongo.js";
const produc=new ProductManagerMongo()

export default class CartDaoMongo {
    constructor() {
        this.model = carsModel;
    }
  

   
    getCart= async() =>await this.model.find()
    getCartBy =async(filter)=>await this.model.findOne(filter)
    createCart= async()=>await this.model.create({products:[]})
    updateCart=async(cid,pid)=> {
        const result= await this.model.findOneAndUpdate(
            {_id:cid ,'products.product': pid},
            { $inc: {'products.$.quantity':1}},
            {new: true}
        )
        if (result) return result
        const newProductInCart= await this.model.findOneAndUpdate(
            {_id:cid},
            {$push:{products:{product : pid, quantity:1}}},
            {new: true}
        )
            return newProductInCart
        
    }
    deleteProduct= async(cid, pid)=>await this.model.findOneAndUpdate(
        {_id:cid},
        {$pull:{products:{product:pid}}},
        {new: true}
    )
    deletCart=async(cid)=> await this.model.findOneAndUpdate(
        {_id: cid},
        {$set:{products: []}},
        {new: true}
    )
}
