/* ruta /api/usuarios */

const { Router } = require('express');

const {getUsuarios, crearUsuario} = require('../controllers/usuarios')

const router = Router();


//rutas
router.get('/', getUsuarios );

router.post('/new', crearUsuario );




module.exports = router;