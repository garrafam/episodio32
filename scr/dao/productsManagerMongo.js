import { productModel } from "../models/products.models.js"



export default class ProductManagerMongo{
    constructor(){
        this.productModel=productModel
    }   
    addProduct = async(product)=>{
        try{
            const productsBd= await this.productModel.find({})     
                
            //validar
            const productFound=productsBd.find(prod=>product.code===prod.code)
                     
            if (productFound) return 'codigo producto repetido'                    
               
           const result =productModel.create(product)
          console.log ('los productos', product)         
                      
        }
        catch(error){
            console.log(error)
        }
    }
    getProduct=async({limit=10, numPage=1})=>{
  
        const products= await this.productModel.paginate({},{limit ,page:numPage,sort:{price:-1}, lean:true})
        return products
    }    
    getProductById= async(pid)=>{        
        const productsBd= await productModel.find({})     
        const product=productsBd.find(prod=>prod.id===pid)                 
        if(!product)return 'no está el producto solicitado'
        return (product)

        
    }
   
    updateProduct = async (pid, update2) => {
    try{
     const result = await productModel.updateOne({_id: pid},update2)
     console.log('Producto actualizado:', result);
    }  catch(error){'error'}        
}
    deleteProduct=async(pid)=>{
        try{const productsBd= await productModel.find({});
            const product=productsBd.findIndex(prod=>prod.id===pid)
            
            if(product===-1)return'el id no existe'
            else{ 
            const deletedProduct = await productModel.deleteOne({_id: pid})
    
                console.log('el objeto fue eliminado',deletedProduct)
            return deletedProduct;

         
            

             }} catch(error){console.log(error)

        }
        }
    }
