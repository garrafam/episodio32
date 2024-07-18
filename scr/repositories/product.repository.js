


export default class ProductRepository{
    constructor (productsDao){
          this.productsDao =  productsDao
    }
    getProducts=async(limit,numPage)=>await this.productsDao.getAll(limit,numPage)
    getProducts=async()=>await this.productsDao.getAll()
    getProductBy=async(filter)=>await this.productsDao.getBy(filter)
    createProduct=async(newProduct)=>{
        await this.productsDao.create(newProduct)
        console.log(newProduct)
    }
    updateProduct=async(pid, userToUpdate)=>await this.productsDao.update(pid,userToUpdate)
    deleteProduct=async(pid)=>await this.productsDao.delete(pid)
}