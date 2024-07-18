import {Router} from 'express'
import {auth} from '../middlewares/auth.middleware.js'
//import ProductsDaoMongo from '../dao/MONGO/productsDaoMongo.js';
//import CartDaoMongo from '../dao/MONGO/cartDaoMongo.js'
import  {sessionRouter } from './api/session.router.js';
import {productService, cartService} from '../service/index.js'
import { passportCall } from '../middlewares/passportCall.middleware.js';
import { authorization } from '../middlewares/authorization.middleware.js';
const router= Router()

//const productsServ= new ProductsDaoMongo();
//const cartServ= new CartDaoMongo()

const user=
    {username:'marcosgarrafa',
     nombre:'Marcos',
     apellido:'Garrafa',
    role:'admin'}
    
router.get('/login',async(req,res)=>{
  res.render('login')
})
router.get('/register',async(req,res)=>{
    res.render('register')
  })
router.get('/', (req, res) => {
    res.redirect('/login');
  });
 
router.get('/home',async(req,res)=>{
    const { limit, numPage } = req.query;
    const {docs }= await productService.getProducts(limit,numPage)
    res.render('home',{
        products:docs,
        username: user.username,
        nombre: user.nombre,
        apellido: user.apellido,
        role: user.role==='admin',
        title:'Mercadito|| Lagran7',
        //products: await productService.getProducts({limit,numPage}),
        styles:'styles.css',
        
    })
  
})

   router.get('/products',passportCall('jwt'), async (req, res) => {
  try {
    const { numPage, limit} = req.query;
   
   const cid = req.user.cartId;
    
    const { docs,page,hasPrevPage,hasNextPage,prevPage,nextPage } = await productService.getProducts({ limit, numPage });
    res.render('products', {
      productos: docs,
      page,
      hasPrevPage,
      hasNextPage,
      prevPage,
      nextPage,
      cid
    });
  } catch (error) {
    console.error("Error rendering products:", error);
    res.status(500).send('Internal Server Error');
  }
});

    router.get('/cart/:cid', async (req, res) => {
       
        try {
            const {cid}=req.params;
    console.log('prue1',cid)
            if (!cid) {
                return res.status(400).send('Falta el ID del carrito en la query');
            }
    
            const cart = await cartService.getCartBy(cid);
            //({ _id : cid })
    
            if (!cart) {
                return res.status(404).render('cart', {
                   
                    cartProducts: [],
                    cartId: cid,
                    message: 'Carrito no encontrado'
                });
            }
            
            res.render('cart', {
                
            cartId  : cid,
            cart: await cartService.getCartBy(cid),
            cartProducts: cart.products    
        })} catch (error) {
            console.error('Error rendering cart:', error);
            res.status(500).send('Error interno del servidor');
        }
    });
    

router.get('/chat',passportCall('jwt'),authorization('user'),(req,res)=>{
    
    res.render('chat',{
        styles:'styles.css'

    })
})
router.get('/realTimeProducts',async(req,res)=>{
    const{numPage, limit  }=req.query
    const{docs}=await productService.getProducts({limit,numPage})
console.log('esto e s', docs)
    res.render('realTimeProducts',{
        username: user.username,
        nombre: user.nombre,
        apellido: user.apellido,
        role: user.role==='admin',
        title:'Mercadito|| Lagran7',
        products: docs,
        styles:'styles.css'
    })

    })

export default router
