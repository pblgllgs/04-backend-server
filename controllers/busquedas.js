
const {response} = require('express');

const getTodo = (req,res = response) =>{

    const busqueda = req.params.busqueda;
    res.status(202).json({
        ok : true,
        busqueda
    });
}

module.exports = {
    getTodo
}