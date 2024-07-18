export const authorization=role => {
    return async (req, res, next)=>{
        console.log('au',req.user)
        if(!req.user) return res.status(401).send({status:'error', error: 'Unauthorizad'})
            if (req.user.role !== role)return res.status(403).send({status:'error', error: 'not permissions'})
                next()
    }
}