//import fs from 'fs';
//import ProductManager from './productManager.js';
//const path='./Product.json'
//const carFile = './Carrito.json';
import { carsModel } from "../models/cars.model.js";
import { productsModel } from "../models/products.models.js";
import ProductManagerMongo from "./productsManagerMongo.js";
const produc=new ProductManagerMongo()

export default class CarManagerMongo {
    constructor(carFile) {
        this.carFile = carFile;
    }
  
    crearCarrito = async () => {
        try {
            const nuevoCarrito = await carsModel.create({ productos: [] });
            console.log(`Se ha creado un carrito con ID ${nuevoCarrito._id}`);
            return nuevoCarrito._id; // Devolvemos el ID del nuevo carrito
        } catch (error) {
            console.error('Error al crear el carrito:', error);
            return null;
        }
    }
    addProductsCarrito = async (cid, prid) => {
        try {
            const pid = prid.product;
            const quantity = prid.quantity;
    
            // Buscar el carrito por su ID
            const carrito = await carsModel.findById(cid);
            if (!carrito) {
                throw new Error('El carrito especificado no existe.');
            }
    
            // Verificar si el producto ya está en el carrito
            const productoEnCarrito = carrito.productos.find(item => String(item.idProducto) === String(pid));
    
            if (productoEnCarrito) {
                // Si el producto ya existe, sumar la cantidad proporcionada
                productoEnCarrito.quantity += quantity;
            } else {
                // Si el producto no existe en el carrito, agregarlo con su ID
                carrito.productos.push({ pid: pid, quantity });
            }
    console.log('carrito',carrito)
            // Guardar los cambios en la base de datos
            await carrito.save();
    
            console.log(`Se ha agregado el producto con ID ${pid} al carrito con ID ${cid}`);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }  
    
    // Función para ver carritos
    getCarrito = async(pcid ) => {
        const carritos = await carsModel.find({})
        console.log(carritos)
                       
        if(!carritos)return 'no está el carrito solicitado'
        return (carritos)
        
    }

   
    getProductosDeCarrito = async (cid) => {
        try {
            // Leer los datos del archivo que contiene los carritos
            const carritoBd = await carsModel.find({});
    
            // Buscar el carrito correspondiente por su ID
            const carrito = carritoBd.find(carrito => carrito.id === cid);
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
    deleteCarrito=async(cid)=>{
        try{
            const result = await carsModel.deleteOne({_id: cid})
            console.log('se borro el carrito',cid)
            return 'se borro el carrito',cid
        }
        catch(error) {
            console.error(error);
            return

        }
    }
}
