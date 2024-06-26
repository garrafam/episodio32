import { productService } from "../service/index.js"


class ProductsController{
    constructor(){
       this.productService= productService

    }
getProducts=async(req,res)=>{
    const{limit,numPage}=req.body
    const result=await this.productService.getProduct({limit,numPage})      
 res.send(result)
}
getProductById=async(req,res)=>{
    const {pid}=req.params
     const result= await this.productService.getProductById(pid)        
     res.send( result)   
 
 }
addProduct=async (req, res) => {
    
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

   
    const result = await this.productService.addProduct(newProducts)
    
    res.status(200).send({ status: 'success', payload: result })
}
updateProducts=async (req, res) => {
    const { pid } = req.params
    const {title, description, price, thumbnail, status,code,stock} = req.body
    
    if(!code) return res.send({status: 'error', error: 'faltan campos'})
  
    const result = await this.productService.updateProduct({_id: pid}, {title, description, price, thumbnail, status,code,stock})
    //const result = await productsModel.updateOne({_id: pid}, {title, description, price, thumbnail, status,code,stock})
   

    res.status(200).send({ status: 'success', payload: result })

}
deleteProducts= async (req, res) => {
    const { pid } = req.params   
    const result = await this.productService.deleteProduct(pid)
    res.send({status: 'success', payload: result})
}

}
export default ProductsController