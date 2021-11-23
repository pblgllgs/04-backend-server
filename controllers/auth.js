const Usuario =  require('../models/usuario');
const {validationResult} = require('express-validator')
const {response} = require('express');
const bcrypt =  require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');


const login = async (req, res = response) => {

    const {password, email} = req.body;

    try {

        const usuarioDB = await Usuario.findOne({email});
        if(!usuarioDB){
            return res.status(400).json({
                ok:false,
                msg: 'Credenciales invalidas'
            });
        }

        const validPassword = bcrypt.compareSync(password, usuarioDB.password);

        if(!validPassword){
            return res.status(400).json({
                ok : false,
                msg: 'Credenciales invalidas'
            });
        }

        const token = await generarJWT(usuarioDB.id, usuarioDB.email);

        res.status(200).json({
            ok : true,
            token
        });


        /* const usuarioDB = await Usuario.findOne({email});
        if(usuarioDB){
            const validPassword = bcrypt.compareSync(password, usuarioDB.password);

            if(validPassword){
                return res.status(200).json({
                    ok : true,
                    msg: 'OK'
                });
            }else{
                return res.status(400).json({
                    ok:false,
                    msg: 'Credenciales invalidas'
                });
            }
        }else{
            return res.status(400).json({
                ok:false,
                msg: 'El email no esta registrado'
            });
        } */

    }catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:' error inesperado'
        })
    }
}

const googleSign = async (req, res= response) =>{
    //tomamos el token del body
    const googleToken = req.body.token;

    try {

        const {name, email, picture} = await googleVerify(googleToken);

        res.json({
            ok : true,
            msg : 'Google sign in',
            name,
            email,
            picture,
            googleToken
        });

    } catch (error) {

        res.status(401).json({
            ok : false,
            msg : 'Unauthorized'
        });
    }
}


module.exports = {
    login,
    googleSign
}