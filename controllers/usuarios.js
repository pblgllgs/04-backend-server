const Usuario =  require('../models/usuario');
const {validationResult} = require('express-validator')
const {response} = require('express');
const bcrypt =  require('bcryptjs');
const usuario = require('../models/usuario');


const getUsuarios = async (req, res) => {

    const usuarios = await Usuario.find({},'nombre email role google');

    return res.json({
        ok : true,
        usuarios
    })
}

const crearUsuario = async (req, res = response) => {

    const {email,password} = req.body;

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

        //encriptar contraseña, salt numero generado de manera aleatoria,  de una sola via
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

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

const actualizarUsuario = async (req, res = response) => {

    const uid = req.params.id;

    try {
        const usuarioDB = await Usuario.findById(uid);
        if(!usuarioDB){
            return res.status(404).json({
                ok:false,
                msg: 'El usuario no existe'
            });
        }

        //quitamos el password y google, porque no queremos actualizar esos datos
        const {password, google, email, ...campos} = req.body;

        if(usuarioDB.email !== email){
        
            const existeEmail = await Usuario.findOne({email});
            if(existeEmail){
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                })
            }
        }
        campos.email = email;

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new:true});

        res.json({
            ok : true,
            usuario: usuarioActualizado
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
    getUsuarios,crearUsuario, actualizarUsuario
}