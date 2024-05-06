import { Router } from 'express'
//import CarManager from '../scr/dao/carManager.js';
import CarManagerMongo from '../scr/dao/carManagerMongo.js';
const router=Router()
//const {crearCarrito,addProductocar}=new CarManager()
//const carFile='./Carrito.json'
//const products= new CarManager(carFile);
const carts= new CarManagerMongo();
//ver carritos
router.get('/', async(req,res)=>{
    const result=  await carts.getCarrito()   
    res.send(result)
})
router.post('/', async(req,res) =>{    
    console.log('hola')    
    const result=  await carts.crearCarrito()
    res.send(result)
})
router.get('/:cid',async(req,res)=>{
    const {cid}=req.params
    const result= await carts.getProductosDeCarrito(cid)
    console.log(cid)
    res.send(result)
})


router.post('/:cid/products/:pid',async(req,res)=>{
    const {cid, pid}=req.params
    const result= await carts.addProductsCarrito(cid,{product:pid,quantity:1})
    res.send(result)
    
})
router.delete('/:cid', async (req, res) => {    
    const { cid } = req.params   
    const result = await carts.deleteCarrito(cid)
    res.send({status: 'success', payload: result})
})

export default router