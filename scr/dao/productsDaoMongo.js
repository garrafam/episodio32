import { productModel } from "../models/products.models.js"



export default class ProductDaosMongo{
    constructor(){
        this.productModel=productModel
    }       
   
    getProduct=async(limit=10, numPage=1 )=>{
        try{
        const products= await this.productModel.paginate({},{limit ,page:numPage,sort:{price:1}, lean:true})
        console.log('son los productos',products)
        return products
        }catch(error){
            console.log('error')
        }
    }    
    getProductById= async(pid)=>{ 
        try{       
        const productsBd= await productModel.findOne(pid)  
        return productsBd  
        }catch(error){
            console.log('error')
        } 

        
    }
    addProduct = async(newProducts)=>{
        try{
            const productsBd= await this.productModel.create(newProducts)     
        }catch(error){
            console.log('error')
        }  
    } 
   
    updateProduct = async (pid, update2) => {
    try{
     const result = await productModel.updateOne({_id: pid},update2)    
     console.log('Producto actualizado:', result);
     return result
    }  catch(error){'error'}        
}
    deleteProduct=async(pid)=>{
        try{ const deletedProduct = await productModel.deleteOne({_id: pid})
            console.log('el objeto fue eliminado',deletedProduct)
            return deletedProduct;    
             } catch(error){console.log(error)
        }
        }
    }
   