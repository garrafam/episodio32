import fs from 'fs'

const path='./Product.json'

export default class ProductManager{
    constructor(path){
        this.path=path
    }
    
    
    
    
    readFile = async()=>{
        try{const dataJson= await fs.promises.readFile(this.path,'utf-8')
            return JSON.parse(dataJson)
           

        }
        
        catch(error){
            return[]

        }
        

    }
    
    
    addProduct = async(product)=>{
        try{
            const productsBd= await this.readFile()
         
           
            //validar

            const productFound=productsBd.find(prod=>product.code===prod.code)
            
          
            if (productFound) return 'codigo producto repetido'
                
            
            
        

            //asig id
            if(productsBd.length===0){
                product.id=1
            }else{
                product.id= productsBd[productsBd.length-1].id+1
            }
            console.log('hhh',product)
            console.log('hhh',product.id)
            productsBd.push(product)
           // console.log ('los productos', product)
            await fs.promises.writeFile(this.path, JSON.stringify(productsBd,null,'\t'),'utf-8')
            return productsBd
                      
        }
        catch(error){
            console.log(error)
        }
    }
    getProduct=async()=>{
        try{return await this.readFile()
            

        }
        catch(error){console.log(error)

        }
    }
    
    getProductById= async(pid)=>{
        const productsBd= await this.readFile()        
        const product=productsBd.find(prod=>prod.id===parseInt(pid))        
        if(!product)return 'no está el producto solicitado'
        return (product)

        
    }
   
    updateProduct= async (pid, update2)=> {
        const productsBd= await this.readFile() 
        // Buscar el índice del producto con el ID dado
        const index =productsBd.findIndex(product => product.id ===parseInt(pid) )
        const update1= {...update2 , id:(pid) }
        if (index !== -1) {
            // Si se encuentra el producto, actualizar sus propiedades con los nuevos datos
           const actualiza=productsBd.splice(index,1,update1)
            console.log('hola el1',actualiza)
            fs.writeFileSync(this.path, JSON.stringify(productsBd,'\t'),'utf-8');
            
            console.log(index,productsBd[index])

            return true; 
             // Devolver true para indicar que la actualización fue exitosa
        }
        return false; // Devolver false si no se encuentra ningún producto con el ID dado
    }

    deleteProduct=async(pid)=>{
        try{const productsBd= await this.readFile()
            const product=productsBd.findIndex(prod=>prod.id===pid)
            console.log(productsBd)
            if(product===-1){console.log('el id no existe')}
            else{ 
                const deletedProduct = productsBd.splice(product,1);
    fs.writeFileSync(this.path, JSON.stringify(productsBd,'\t'),'utf-8');
    
    return deletedProduct;

         
            console.log('el objeto fue eliminado',product)}

        } catch(error){console.log(error)

        }
    }

}
//module.exports={
    ProductManager
//}

