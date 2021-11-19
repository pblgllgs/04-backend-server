const { response } = require("express");

const Medico = require('../models/medico');



const getMedicos = async (req,res = response) =>{

    const medicos = await Medico.find({},'nombre hospital usuario');
    return res.status(202).json({
        ok : true,
        uid: req.uid,
        medicos,
    });
}

const crearMedico = async (req,res = response) =>{

    const uid = req.uid;
    const medico = new Medico({
        usuario: uid,
        ...req.body
    });

    try {

        const medicoDB = await medico.save();

        res.json({
            ok:true,
            medico: medicoDB
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: '500 Internal Server Error'
        });
    }
}

const actualizarMedico = (req,res = response) =>{

    res.json({
        ok:true,
        msg: 'actualizar Medico'
    })
}


const borrarMedico = (req,res = response) =>{

    res.json({
        ok:true,
        msg: 'borrar Medico'
    })
}



module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}