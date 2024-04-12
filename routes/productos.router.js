import { Router } from 'express'
import ProductManager from '../scr/productManager.js'
const router=Router()
//const {getProduct, getProductById,addProduct,updateProduct,deleteProduct}=new ProductManager()
const path='../Product.json'
const products= new ProductManager(path);

router.get('/', async(req,res)=>{
    const result= await products.getProduct()
    console.log(products)
 res.send(result)
})
router.get('/:pid',async(req,res)=>{
    const {pid}=req.params
     const result= await products.getProductById(parseInt(pid))
     //console.log('este seria' ,result)
     //console.log('este seria' ,pid)   
     res.send( result)   
 
 })
 
router.post('/', async(req,res) =>{
    
    const {title,description,price,thumbnail,code,stock}=req.body
    const product={title,description,price,thumbnail,code,stock}
    console.log('este esel que necesito',product)
    const result= await products.addProduct(product)
    res.send( result)
 

})
router.put('/:pid', async(req,res) =>{
       const{pid}=req.params
       const{title,description,price,thumbnail,code,stock}=req.body
    const update2={title,description,price,thumbnail,code,stock}    
    console.log('este es el que necesito',update2)
       const result= await products.updateProduct(parseInt(pid),{update2})
       res.send( result)  
})
router.delete('/:pid', async(req,res) =>{
  const{pid}=req.params
  const result= await products.deleteProduct(parseInt(pid))
  res.send(result)
})



export default router