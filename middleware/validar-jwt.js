const { response } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = (req, res = response,next) => {

    //leo el token
    const token = req.header('x-token');

    //si no existe
    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'Unauthorized'
        });
    }
    //si existe
    try {
        const {uid, email} = jwt.verify(token , process.env.SECRET_JWT_SEED);
        req.uid = uid;
        req.email = email;
        //todo sale bien
        next();
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Internal Server Error'
        });
    }
}

module.exports = {
    validarJWT
}