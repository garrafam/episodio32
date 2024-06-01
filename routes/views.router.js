import {Router} from 'express'
import {auth} from '../scr/middlewares/auth.middleware.js'
//import ProductManager from '../scr/dao/productManager.js';
import ProductManagerMongo from '../scr/dao/productsManagerMongo.js';
import CarManagerMongo from '../scr/dao/carManagerMongo.js'
import  {sessionRouter } from './session.router.js';
//import obtenerProductosMiddleware from '../scr/utils.js';
const router= Router()
//const path='./Product.json'
//const products= new ProductManager(path);
const productsServ= new ProductManagerMongo();
const cartServ= new CarManagerMongo()

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
    res.render('home',{
        username: user.username,
        nombre: user.nombre,
        apellido: user.apellido,
        role: user.role==='admin',
        title:'Mercadito|| Lagran7',
        products: await productsServ.getProduct(),
        styles:'styles.css'
       
    })
    //console.log(products.getProduct())
})
//auth,
router.get('/products', async  (req,res)=>{
    const{numPage, limit ,cid }=req.query
    const userCookie = req.cookies.codercookie 
    const userName= req.cookies.userName
    console.log('cooq',userCookie, req.cookies.userName)
    res.cookie('codercookie',userCookie, {maxAge: 1000000})
    res.cookie('useName',userName, {maxAge: 1000000})
    const {docs,page,hasPrevPage,hasNextPage,prevPage,nextPage }= await productsServ.getProduct({limit,numPage})
    //const session=new sessionRouter
    
    res.render('products',{
        productos:docs,
        page,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
        userCookie,
        userName,
        cid

    }

    )})
    router.get('/cart/:cid', async (req, res) => {
       
        try {
            const {cid}=req.params;
    console.log('prue',cid)
            if (!cid) {
                return res.status(400).send('Falta el ID del carrito en la query');
            }
    
            const cart = await cartServ.getCartBy(({ _id : cid }));
            //console.log ('soy',cart.products)
    
            if (!cart) {
                return res.status(404).render('cart', {
                    userCookie: req.cookies.userCookie,
                    userName: req.session.user.email,
                    cartProducts: [],
                    cartId: cid,
                    message: 'Carrito no encontrado'
                });
            }
    
            res.render('cart', {
                userCookie: req.cookies.userCookie,
                userName: req.session.user.email,
                cartProducts: cart.products,
                cartId: cid
            });
        } catch (error) {
            console.error('Error rendering cart:', error);
            res.status(500).send('Error interno del servidor');
        }
    });

router.get('/chat',(req,res)=>{
    res.render('chat',{
        styles:'styles.css'

    })
})
router.get('/realTimeProducts',async(req,res)=>{
    res.render('realTimeProducts',{
        username: user.username,
        nombre: user.nombre,
        apellido: user.apellido,
        role: user.role==='admin',
        title:'Mercadito|| Lagran7',
        products:await productsServ.getProduct(),
        styles:'styles.css'
    })

    })

export default router
