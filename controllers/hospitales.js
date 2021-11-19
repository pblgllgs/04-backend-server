const { response } = require("express")

const Hospital = require('../models/hospital')


const getHospitales = async (req,res = response) =>{

    const hospitales = await Hospital.find({},'nombre usuario id  ');
    return res.status(202).json({
        ok : true,
        uid: req.uid,
        hospitales,
    });
}

const crearHospital = async (req,res = response) =>{

    const uid = req.uid;
    const hostipal = new Hospital({
        usuario: uid,
        ...req.body
    });

    try {

        const hospitalDB = await hostipal.save();

        res.json({
            ok:true,
            hospital: hospitalDB
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: '500 Internal Server Error'
        });
    }

    
}

const actualizarHospital = (req,res = response) =>{

    res.json({
        ok:true,
        msg: 'actualizar Hospital'
    })
}


const borrarHospital = (req,res = response) =>{

    res.json({
        ok:true,
        msg: 'borrar Hospital'
    })
}



module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}