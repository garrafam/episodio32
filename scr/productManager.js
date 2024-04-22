import fs from 'fs'

//const path='./Product.json'

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
            console.log('hhhhh',product)
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
   
    updateProduct = async (pid, update2) => {
        try {
            const productsBd = await this.readFile();
            const index = productsBd.findIndex(product => product.id === parseInt(pid));
        
            if (index !== -1) {
                // Crear un objeto para contener las actualizaciones
                const updates = {};
        
                // Iterar sobre las claves de update2 y agregar las no vacías al objeto de actualizaciones
                for (const key in update2) {
                    if (update2[key] !== '' && update2[key] !== undefined) {
                        updates[key] = update2[key];
                    }
                }
        
                // Aplicar las actualizaciones al producto
                productsBd[index] = { ...productsBd[index], ...updates };
        
                try {
                    // Escribir la lista de productos actualizada en el archivo JSON
                    fs.writeFileSync(this.path, JSON.stringify(productsBd, null, '\t'), 'utf-8');
                    console.log('Producto actualizado:', productsBd[index]);
                    return true; // Indicar que la actualización fue exitosa
                } catch (error) {
                    console.error('Error al escribir en el archivo:', error);
                    return false; // Indicar que la actualización falló debido a un error de escritura
                }
            } else {
                console.log('Producto no encontrado');
                return false; // Indicar que la actualización falló porque no se encontró el producto
            }
        } catch (error) {
            console.error('Error al actualizar el producto:', error);
            return false; // Indicar que la actualización falló debido a un error
        }
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

