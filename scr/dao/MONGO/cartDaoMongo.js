
import { carsModel } from "./models/carts.model.js";
import ProductManagerMongo from "./productsDaoMongo.js";
const produc=new ProductManagerMongo()

export default class CartDaoMongo {
    constructor() {
        this.model = carsModel;
    }
  

   
    getAll= async() =>await this.model.find()
    getBy =async(cid)=>await this.model.findOne({_id:cid})
    create= async()=>await this.model.create({products:[]})
    update=async(cid,pid)=> {
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
    deleteByProduct= async(cid, pid)=>await this.model.findOneAndUpdate(
        {_id:cid},
        {$pull:{products:{product:pid}}},
        {new: true}
    )
    delete=async(cid)=> await this.model.findOneAndUpdate(
        {_id: cid},
        {$set:{products: []}},
        {new: true}
    )
}
