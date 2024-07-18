import { productModel } from "./models/products.models.js"



export default class ProductDaosMongo{
    constructor(){
        this.productModel=productModel
    }       
   
    getAll=async(limit=20, numPage=1 )=>await this.productModel.paginate({},{limit ,page:numPage,sort:{price:1}, lean:true})
       
          
    getBy= async(filter)=> await productModel.findOne(filter)
    
        
    create = async(newProducts)=>{
        await this.productModel.create(newProducts) 
        console.log('esto es lo ultimo',newProducts)
    }
   
    update = async (pid, update2) => await productModel.updateOne({_id: pid},update2) ;
   

    delete=async(pid)=>await productModel.deleteOne({ _id: pid })
         
          
    }
   