import jwt from 'jsonwebtoken'

export const PRIVATE_KEY ='coder-secret'

export const generateToken= user=>jwt.sign(user, PRIVATE_KEY, {expiresIn: '24h'})

export const authTokenMiddlerware=( req, res, next)=>{
    const authHeader= req.headers.autorization
    if(!authHeader) return res.status(401).send({status: 'error', error:'Not authenticated'})
    const token=authHeader.split(' ') [1] 
   jwt.verify(token, PRIVATE_KEY,(error, credential)=>{
        if(error) return res.status(401).send({status: 'error', error:'Not authenticated'})
        req.user=credential.user
        next()
   })
}