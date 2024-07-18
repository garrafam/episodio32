import { productService } from "../service/index.js"


class ProductsController{
    constructor(){
       this.productService= productService;

    this.getProducts = this.getProducts.bind(this);
    this.getProductBy = this.getProductBy.bind(this);
    this.addProduct = this.addProduct.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);

    }

getProducts = async (req, res) => {
    try {
      const { limit, numPage } = req.query;
      const result = await this.productService.getProducts({ limit, numPage });
      res.send(result);
    } catch (error) {
      console.error("Error getting products:", error);
      res.status(500).send({ status: 'error', error: 'An error occurred while getting products' });
    }
  }
getProductBy=async(req,res)=>{
    const {pid}=req.params
     const result= await this.productService.getProductBy(pid)        
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

   
    const result = await this.productService.createProduct(newProducts)
    
    res.status(200).send({ status: 'success', payload: result })
}
updateProduct=async (req, res) => {
    try{
    const { pid } = req.params
    const {title, description, price, thumbnail, status,code,stock} = req.body
    if(!code) return res.send({status: 'error', error: 'faltan campos'})
  
    const result = await this.productService.updateProduct({_id: pid}, {title, description, price, thumbnail, status,code,stock})
    res.status(200).send({ status: 'success', payload: result })
} catch (error){
    console.error("Error modificando producto:", error);

}

   

}
deleteProduct= async (req, res) => {
    try{
    const { pid } = req.params   
    const result = await this.productService.deleteProduct(pid)
    res.send({status: 'success', payload: result})
    } catch(error){
        console.error("Error al eliminar producto:", error);
        res.status(500).send({ status: 'error', error: 'ocurrio un error al eliminar' });
    }

}
}
export default ProductsController