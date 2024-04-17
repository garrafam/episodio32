import {Router} from 'express'
import ProductManager from '../scr/productManager.js';
const router= Router()
const path='./Product.json'
const products= new ProductManager(path);
const user=
    {username:'marcosgarrafa',
     nombre:'Marcos',
     apellido:'Garrafa',
    role:'admin'}

router.get('/',async(req,res)=>{
    res.render('home',{
        username: user.username,
        nombre: user.nombre,
        apellido: user.apellido,
        role: user.role==='admin',
        title:'Mercadito|| Lagran7',
        products: await products.getProduct(),
        styles:'styles.css'
    })

})
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
        products: await products.getProduct(),
        styles:'styles.css'
    })

    })

export default router