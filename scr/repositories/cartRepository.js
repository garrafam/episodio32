

export default class CartRepository{

    constructor (cartDao){
          this.cartDao =  cartDao
    }
    getCart=async()=>await this.cartDao.getAll()
    getCartBy=async(cid)=>await this.cartDao.getBy(cid)
    createCart=async(newProduct)=>await this.cartDao.create(newProduct)
    updateCart=async(cid, userToUpdate)=>await this.cartDao.update(cid,userToUpdate)
    deleteProductCartBy=async(cid, pid)=>await this.cartDao.deleteByProduct(cid, pid)
    deleteCart=async(cid)=>await this.cartDao.delete(cid)
}