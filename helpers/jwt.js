const jwt = require('jsonwebtoken');

const generarJWT = (uid, email) => {

    return new Promise( (resolve, reject) =>{
        const payload = {uid, email};

        jwt.sign(payload,process.env.SECRET_JWT_SEED,{
            expiresIn: '24h'
        },(err, token)=>{
            if(err){
                //MAL
                console.log(err)
                reject(err);
            }else{
                //todo bien
                resolve(token);
            }
        });

    });

}

module.exports = {
    generarJWT
}