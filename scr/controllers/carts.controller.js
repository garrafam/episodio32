import { userModel } from "../dao/MONGO/models/user.models.js"
import { cartService } from "../service/index.js"

class CartController{
    constructor(){
       this.cartService= cartService

    }
    getCart=async(req,res)=>{
        try{
        const result=  await this.cartService.getCart()   
        res.send(result)
        }catch(error){
            console.log('error')
        }
    }
    getCartBy=async(req,res)=>{
        try{
        const {cid}=req.params
        const result= await this.cartService.getCartBy(cid)      
        res.send(result)
        }catch(error){
            console.log('error')
        }
    }
    createCart=async(req,res) =>{                
        try{           
        const result=  await this.cartService.createCart()
        res.send(result)
        }catch(error){
            console.log('error')
        }
    }
    updateCart=async(req,res)=>{
        try{
        const {cid, pid}=req.params
        const result= await this.cartService.updateCart(cid,pid)
        res.send(result)
        }catch(error){
            console.log('error')
        }
        
    }
    deleteProductCart=async (req, res) => { 
        try{   
        const { cid,pid } = req.params   
        const result = await this.cartService.deleteProductCartBy(cid, pid)
        res.send({status: 'success', payload: result})
        }catch(error){
            console.log('error')
        }
    }
    deletCart=async (req, res) => {
        try{    
        const { cid } = req.params   
        const result = await this.cartService.deleteCart(cid,)
        res.send({status: 'success', payload: result})
        }catch(error){
            console.log('error')
        }
    }


}
export default CartController