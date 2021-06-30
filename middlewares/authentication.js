const jwt = require('jsonwebtoken')

function verifyUser(req, res,next){
    let authHeader=req.headers.authorization;
    if(!authHeader){
        let error = new Error('Unauthenticated information')
        error.status = 401;
        return next(error);
    }

    let token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.SECRET, (error, payload)=>{
        if(error){
            let error = new Error('Token could not be verified')
            return next(error)
        }
        req.user = payload
        next()
    })
}


function verifyAdmin(req,res,next){
    if (!req.user){
        let error = new Error('No authenticated information')
        error.status=401
        return next(error)
    }
    else if(req.user.role !== 'admin'){
        let error=new Error('Forbidden')
        error.status=401
        return next(error)
    }
    next()
}

module.exports = {
    verifyAdmin,
    verifyUser
}