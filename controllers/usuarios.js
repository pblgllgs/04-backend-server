


const getUSuarios = (req, res) => {
    res.json({
        ok : true,
        usuarios: []
    })
}

const crearUsuario = (req, res) => {
    res.json({
        ok : true,
        msg: 'creando usuario'
    })
}


module.exports = {
    getUSuarios,crearUsuario
}