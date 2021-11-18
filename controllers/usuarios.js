const Usuario =  require('../models/usuario');
const {validationResult} = require('express-validator')
const {response} = require('express')


const getUsuarios = async (req, res) => {

    const usuarios = await Usuario.find({},'nombre email role google');

    return res.json({
        ok : true,
        usuarios
    })
}

const crearUsuario = async (req, res = response) => {

    const {email, nombre, password} = req.body;

    const errores = validationResult(req);

    try {
        const existeEmail = await Usuario.findOne({email});
        if(existeEmail){
            return res.status(400).json({
                ok:false,
                msg: 'El email ya esta registrado'
            });
        }
        const usuario = new Usuario(req.body);
        await usuario.save();

        res.json({
            ok : true,
            usuario
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:' error inesperado'
        })
    }

}


module.exports = {
    getUsuarios,crearUsuario
}