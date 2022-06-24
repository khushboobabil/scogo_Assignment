
const jwt=require("jsonwebtoken")


//Authorization
const authorisation = async function(req,res,next){
    try{
        let token = req.headers["x-api-key"]

        if(!token) return res.status(400).send({status:false,msg:'enter the token in header'})

        let decodedToken = jwt.verify(token, "Secret-Key", {ignoreExpiration: true})

        // token => userId, exp , iat
        
        let exp = decodedToken.exp
        let timeNow = Math.floor(Date.now() / 1000)
        if(exp<timeNow) return res.status(401).send({status:false,msg:'Token is expired now'})
        next()

    }catch(error){
        return res.status(500).send({status:false, msg:error.message})
    }
}



module.exports.authorisation = authorisation;