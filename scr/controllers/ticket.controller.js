import { ticketService , cartService, productService} from "../service/index.js";

export default class TicketController{
    constructor(){
       this.ticketService=  ticketService

    }
    async getTicket(req, res){
        try {
            let ticket = await ticketService.getTicket()
            res.status(200).send(ticket)
        } catch (error) {
            console.log(error)
        }
    }
    
    async getTicketBy(req,res){
        const {tid} = req.params
        const ticket = await ticketService.getTicketBy(tid)
        res.status(200).send(ticket)
    }

    async createTicket(req, res) {
        try {
            //console.log ('car',req.user.cartId)
            const  {cid}  = req.user.cartId
          
            const cart = await cartService.getCartBy(cid);
    
            if (!cart) {
                return res.status(401).json({
                    status: 'error',
                    message: 'Cart not found'
                });
            }
    
            // Array de IDs de productos que no se pudieron comprar
            const productsNotPurchased = [];
    
            // Comprobamos la disponibilidad de cada producto en el carrito
            for (const item of cart.products) {
                const product = item.product;
                const quantity = item.quantity;
    
                const productData = await productService.getProductBy(product._id);
    console.log('esto es', productData)
                if (!productData) {
                    productsNotPurchased.push(product._id);
                    continue;
                }
    
                if (quantity > productData.stock) {
                    // Si no hay suficiente stock, agregamos el ID del producto a la lista de no comprados
                    productsNotPurchased.push(product._id);
                } else {
                    // Si hay suficiente stock, restamos la cantidad comprada del stock del producto
                    await productService.updateProduct(product._id, { stock: productData.stock - quantity });
                }
            }
    
            // Calculamos el precio total de los productos comprados
            const totalPrice = cart.products
                .filter(item => !productsNotPurchased.includes(item.product._id))
                .reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    console.log('precio',totalPrice)
            // Creamos el ticket con los datos de la compra
            const ticket = await ticketService.createTicket({
                user: req.user,
                products: cart.products.filter(item => !productsNotPurchased.includes(item.product._id)),
                totalPrice
                
            });
            console.log('precio',ticket)
    
            // Si hay productos no comprados, actualizamos el carrito para quitarlos
            if (productsNotPurchased.length > 0) {
                await cartService.updateCart(cid, cart.products.filter(item => !productsNotPurchased.includes(item.product._id)));
            } else {
                // Si todos los productos se pudieron comprar, vaciamos el carrito
                await cartService.deleteCart(cid);
            }
    
            res.status(200).json({
                status: 'success',
                message: 'Purchase completed successfully',
                productsNotPurchased,
                ticket
            });
        } catch (error) {
            console.error("Error creating ticket:", error);
            res.status(500).json({
                status: 'error',
                message: 'Internal server error'
            });
        }
    }
    
    updateTicket(){}
    deleteTicket=async(tid)=> await ticketService.deleteTicket(pid)
}

