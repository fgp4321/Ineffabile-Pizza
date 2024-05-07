// jwt.mw.js
const jwt = require("jsonwebtoken");

function extractToken(req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === "Bearer") {
        return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
        return req.query.token;
    } else if (req.session && req.session.jwtToken) {
        return req.session.jwtToken;
    }    
    return null;
}

function rutasProtegidasJWT(rolesPermitidos = []) {
    return (req, res, next) => {
        const token = extractToken(req);
        if (token) {
            jwt.verify(token, process.env.JWT_PASS, (err, decoded) => {
                //console.log("Decoded JWT:", decoded);
                if (err) {
                    res.status(401).json({ msg: "Token inválido" });
                } else if (!rolesPermitidos.includes(decoded.role)) {
                    res.status(403).json({ msg: "Acceso denegado: no tiene permisos suficientes" });
                } else {
                    req.user = decoded;
                    next();
                }
            });
        } else {
            res.redirect("/usuarios/login-register");
        }
    };
}

module.exports = rutasProtegidasJWT;
