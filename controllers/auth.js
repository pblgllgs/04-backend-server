const Usuario =  require('../models/usuario');
const {validationResult} = require('express-validator')
const {response} = require('express');
const bcrypt =  require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');


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


module.exports = {
    login
}