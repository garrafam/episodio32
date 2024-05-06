import { productsModel } from "../models/products.models.js"



export default class ProductManagerMongo{
    constructor(path){
        this.path=path
    }
        
    addProduct = async(product)=>{
        try{
            const productsBd= await productsModel.find({})     
                
            //validar
            const productFound=productsBd.find(prod=>product.code===prod.code)
                     
            if (productFound) return 'codigo producto repetido'                    
               
           const result =productsModel.create(product)
          console.log ('los productos', product)         
                      
        }
        catch(error){
            console.log(error)
        }
    }
    getProduct=async()=>{
        try{return await productsModel.find({})            

        }
        catch(error){console.log(error)
        }
    }    
    getProductById= async(pid)=>{        
        const productsBd= await productsModel.find({})     
        const product=productsBd.find(prod=>prod.id===pid)                 
        if(!product)return 'no está el producto solicitado'
        return (product)

        
    }
   
    updateProduct = async (pid, update2) => {
    try{
     const result = await productsModel.updateOne({_id: pid},update2)
     console.log('Producto actualizado:', result);
    }  catch(error){'error'}        
}
    deleteProduct=async(pid)=>{
        try{const productsBd= await productsModel.find({});
            const product=productsBd.findIndex(prod=>prod.id===pid)
            
            if(product===-1)return'el id no existe'
            else{ 
            const deletedProduct = await productsModel.deleteOne({_id: pid})
    
                console.log('el objeto fue eliminado',deletedProduct)
            return deletedProduct;

         
            

             }} catch(error){console.log(error)

        }
        }
    }
