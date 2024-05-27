import { Router } from "express";
const router=Router()
router.get ('/setCookie', (req,res)=>{
    res.cookie('codercookie','Esta es una coookie muy poderosa ', {maxAge: 1000000}).send('cookie')
})
router.get ('/setCookieSigned', (req,res)=>{
    res.cookie('codercookie','Esta es una coookie muy poderosa ', {maxAge: 1000000, signed:true}).send('cookie signed')
})
router.get ('/getCookie', (req,res)=>{
    res.send(req.signedCookies)

})
router.get ('/deleteCookie', (req,res)=>{
    res.clearCookie('codercookie').send('cookie borrada')

})
router.get('/login', (req, res) => {
    const firts_name= req.cookies.first_name || 'Invitado';
    res.render('login', { firts_name });
  });
//prebas con session
router.get('/session', (req,res)=>{
    if (req.session.counter){
        req.session.counter++
        res.send(`se ha visitado ${req.session.counter} veces a la pagina`)
    }
    else{
        req.session.counter=1
        res.send('Bienvenidos')
    }
})
router.get('/logout', (req,res)=>{
    req.session.destroy(err=>{
        if(err)return res.send({status:'error', error:err})
            else return res.send('logout')

    })
})
export default router