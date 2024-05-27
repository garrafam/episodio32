//import fs from 'fs';
//import ProductManager from './productManager.js';
//const path='./Product.json'
//const carFile = './Carrito.json';
import { carsModel } from "../models/cars.model.js";
//import { productModel } from "../models/products.models.js";
import ProductManagerMongo from "./productsManagerMongo.js";
const produc=new ProductManagerMongo()

export default class CarManagerMongo {
    constructor() {
        this.model = carsModel;
    }
  
   /* crearCarrito = async () => {
        try {
            const nuevoCarrito = await this.model.create({ productos: [] });
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
            const carrito = await this.model.findById(cid);
            console.log('caRR', carrito)
            if (!carrito) {
                throw new Error('El carrito especificado no existe.');
            }
    
            // Verificar si el producto ya está en el carrito
            const productoEnCarrito = carrito.products.find(item => String(item.product) === String(pid));
   
            if (productoEnCarrito) {
                // Si el producto ya existe, sumar la cantidad proporcionada
                productoEnCarrito.quantity += quantity;
            } else {
                // Si el producto no existe en el carrito, agregarlo con su ID
                carrito.products.push({product: pid, quantity });
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
        const carritos = await this.model.find({})
        console.log(carritos)
                       
        if(!carritos)return 'no está el carrito solicitado'
        return (carritos)
        
    }

   
    getProductosDeCarrito = async (cid) => {
        try {
            // Leer los datos del archivo que contiene los carritos
            const carritoBd = await this.model.find({});
     console.log ('1',carritoBd)
            // Buscar el carrito correspondiente por su ID
            const carrito = carritoBd.find(carrito => carrito.id === cid);
            if (!carrito) {
                throw new Error('El carrito especificado no existe.');
            }
    
            // Mostrar los productos del carrito
            console.log('Productos del carrito:');
            carrito.products.forEach(product => {
                console.log(carrito.products)
                console.log(`ID: ${product._id}, Cantidad: ${product.quantity}`);
            });
    
            // Devolver los productos del carrito
            return carrito.products;
        } catch (error) {
            console.error(error);
            return [];
        }
    }
    updateCarrito=async()=>{}
    updateCarritoProdId= async()=>{}
    deleteCarrito=async(cid)=>{
        try{
            const result = await this.model.deleteOne({_id: cid})
            console.log('se borro el carrito',cid)
            return 'se borro el carrito',cid
        }
        catch(error) {
            console.error(error);
            return

        }
    }*/
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
