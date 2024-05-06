import fs from 'fs';
import ProductManager from './productManager.js';
const path='./Product.json'
const carFile = './Carrito.json';
const produc=new ProductManager(path)
export default class CarManager {
    constructor() {
        this.carFile = carFile;
    }

    readFile = async () => {
        try {
            const dataJson = await fs.promises.readFile(this.carFile, 'utf-8');
            return JSON.parse(dataJson);
        } catch (error) {
            console.error(error);
            return [];
        }
    }
    readFile1 = async () => {
        try {
            const dataJson = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(dataJson);
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    getNextId = async () => {
        try {
            const carritoBd = await this.readFile();
            if (carritoBd.length === 0) {
                return 1;
            } else {
                return carritoBd[carritoBd.length - 1].id + 1;
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    crearCarrito = async () => {         
        const carritoBd = await this.readFile();
        const carrito = {
            id: await this.getNextId(), 
            productos: []
        };
      
        carritoBd.push(carrito);
        
        console.log(`Se ha creado un carrito con ID ${carrito.id}`);
        
        try {
            fs.writeFileSync(this.carFile, JSON.stringify(carritoBd, null, '\t'), 'utf-8');
        } catch (error) {
            console.error(error);
        }
        
        return carrito.id; 
    }
  
    // Función para buscar un producto en el carrito por su ID
    getProductCarrito = (carrito,pcid ) => {
        
        console.log( 'hoy', carrito,pcid)
        return carrito.productos.find(producto => producto.id ===pcid);
        
    }

    addProductsCarrito = async (cid,pid)=> {
        try {
            
            const carritoBd = await this.readFile();
          console.log('esto es primero',carritoBd)
            const pcid=parseInt(pid.product)
            // Buscar el carrito correspondiente por su ID
            const carrito = carritoBd.find(carrito =>carrito.id ===parseInt(cid));
         //   console.log('esta esel carrito',carrito)
            const cantidad=parseInt(pid.quantity)
           
            console.log('esta es la cantidad',parseInt(pid.quantity),cid)
            if (!carrito) {
                throw new Error('El carrito especificado no existe.');
            }

            // Buscar el producto correspondiente por su ID en ProductManager
            const producto = await produc.getProductById(pcid);
            console.log('esta es el carrito',producto,pcid)
            
            if (!producto) {
                throw new Error('El producto especificado no existe.');
            }

            // Verificar si el producto ya está en el carrito
            const productoEnCarrito =this.getProductCarrito(carrito, pcid)
            if (productoEnCarrito) {
               console.log('producto en carrito',productoEnCarrito)
                // Si el producto ya existe, sumar la cantidad proporcionada
                productoEnCarrito.cantidad += cantidad;
                console.log('cantidad al final',cantidad)

            } else {
                // Si el producto no existe, agregarlo al carrito con la cantidad proporcionada
                carrito.productos.push({ id: pcid, cantidad });
            }

            // Guardar los cambios en el archivo JSON
           fs.writeFileSync(this.carFile, JSON.stringify(carritoBd, null, '\t'), 'utf-8');

            console.log(`Se ha agregado el producto con ID ${pcid} al carrito con ID ${cid}`);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
    
    getProductosDeCarrito = async (cid) => {
        try {
            // Leer los datos del archivo que contiene los carritos
            const carritoBd = await this.readFile();
    
            // Buscar el carrito correspondiente por su ID
            const carrito = carritoBd.find(carrito => carrito.id === parseInt(cid));
            if (!carrito) {
                throw new Error('El carrito especificado no existe.');
            }
    
            // Mostrar los productos del carrito
            console.log('Productos del carrito:');
            carrito.productos.forEach(producto => {
                console.log(`ID: ${producto.id}, Cantidad: ${producto.cantidad}`);
            });
    
            // Devolver los productos del carrito
            return carrito.productos;
        } catch (error) {
            console.error(error);
            return [];
        }
    }
}




