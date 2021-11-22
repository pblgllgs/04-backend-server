
const {response} = require('express');

const Usuario =  require('../models/usuario');
const Medico =  require('../models/medico');
const Hospital =  require('../models/hospital');

const getTodo = async (req,res = response) =>{

    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda,'i')

    const [usuarios, medicos, hospitales] = await Promise.all([
        Usuario.find({ nombre : regex }),
        Medico.find({ nombre : regex }),
        Hospital.find({ nombre : regex })

    ]);

    res.status(202).json({
        ok : true,
        usuarios,
        medicos,
        hospitales
    });
}

module.exports = {
    getTodo
}