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
    const result=  await carts.getCart()   
    res.send(result)
})
router.post('/', async(req,res) =>{    
    console.log('hola')    
    const result=  await carts.createCart()
    res.send(result)
})
router.get('/:cid',async(req,res)=>{
    const {cid}=req.params
    const result= await carts.getCartBy({_id:cid})
    console.log(cid)
    res.send(result)
})


router.put('/:cid/products/:pid',async(req,res)=>{
    const {cid, pid}=req.params
    const result= await carts.updateCart(cid,pid)
    res.send(result)
    
})

router.delete('/:cid/products/:pid', async (req, res) => {    
    const { cid,pid } = req.params   
    const result = await carts.deleteProduct(cid, pid)
    res.send({status: 'success', payload: result})
})
router.delete('/:cid', async (req, res) => {    
    const { cid } = req.params   
    const result = await carts.deletCart(cid,)
    res.send({status: 'success', payload: result})
})

export default router