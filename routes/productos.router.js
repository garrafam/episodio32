import { Router } from 'express'
//import { productsModel } from '../scr/models/products.models.js'
import ProductManagerMongo from '../scr/dao/productsManagerMongo.js'
//import ProductManager from '../scr/dao/productManager.js'
const router=Router()

//const path='./Product.json'
const products= new ProductManagerMongo();

router.get('/', async(req,res)=>{
    const result=await products.getProduct()      
 res.send(result)
})
router.get('/:pid',async(req,res)=>{
        const {pid}=req.params
         const result= await products.getProductById(pid)        
         res.send( result)   
     
     })
//router.get('/:pid',async(req,res)=>{
//    const {pid}=req.params
//     const result= await products.getProductById(parseInt(pid))
//     //console.log('este seria' ,result)
//     //console.log('este seria' ,pid)   
//     res.send( result)   
 
// })
 
//router.post('/', async(req,res) =>{
//    
//    const {title,description,price,thumbnail,status,code,stock}=req.body
//    const product={title,description,price,thumbnail,status:true,code,stock}
//    console.log('este esel que necesito',product)
//    const result= await products.addProduct(product)
//    res.send( result)
// 
//
//})
router.post('/', async (req, res) => {
    
    const {  title, description, price, thumbnail, status,code,stock} = req.body
     console.log(title, description, price, thumbnail, status,code,stock)
    if(!title ||!description||!price||!status|| !code||!stock) return res.send({status: 'error', error: 'faltan campos'})
   
    // persistencia en mongo -> atlas
    const newProducts = {
        title ,
        description,
        price,
        thumbnail,
        status,
        code,
        stock,
    }

    //const result = await productsModel.create(newProducts)
    const result = await products.addProduct(newProducts)
    
    res.status(200).send({ status: 'success', payload: result })
})




//router.put('/:pid', async(req,res) =>{
//       const{pid}=req.params
//       const{title,description,price,thumbnail,code,stock}=req.body
//    const update2={title,description,price,thumbnail,code,stock}    
//    console.log('este es el que necesito',update2)
//       const result= await products.updateProduct(parseInt(pid),update2)
//       res.send( result)  //
//})
router.put('/:pid', async (req, res) => {
    const { pid } = req.params
    const {title, description, price, thumbnail, status,code,stock} = req.body
    
    if(!code) return res.send({status: 'error', error: 'faltan campos'})
  
    const result = await products.updateProduct({_id: pid}, {title, description, price, thumbnail, status,code,stock})
    //const result = await productsModel.updateOne({_id: pid}, {title, description, price, thumbnail, status,code,stock})
   

    res.status(200).send({ status: 'success', payload: result })

})



//router.delete('/:pid', async(req,res) =>{
//  const{pid}=req.params
//  const result= await products.deleteProduct(parseInt(pid))
//  res.send(result)
//})
router.delete('/:pid', async (req, res) => {
    const { pid } = req.params   
    const result = await products.deleteProduct(pid)
    res.send({status: 'success', payload: result})
})


export default router