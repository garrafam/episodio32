export const productSocket= (socketServer)=>{
    return(req,res,next)=>{
        req.socketServer=socketServer
        return next()
    }
}