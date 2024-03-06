require("dotenv").config()
const jwt = require("jsonwebtoken") //npm i jsonwebtoken

function extractToken(req){
    if(req.headers.authorization && req.headers.authorization.split(' ')[0] === "Bearer"){
        return req.headers.authorization.split(' ')[1]
    }else if(req.query && req.query.token){
            return req.query.token
    } else if (req.session && req.session.jwtToken){
        return req.session.jwtToken
    }    
}

function rutasProtegidasJWT(req,res,next){
    const token = extractToken(req)
    console.log(token)

    if(token){
        jwt.verify(token,process.env.JWT_PASS,(err,decoded)=>{
            if(err){
                res.status(401).json({msg:"Token inválido"})
            }else{
                //Verificación CORRECTA
                next()
            }
        })
    } else {
        res.render("notLogin.ejs")
    }
}

module.exports = rutasProtegidasJWT