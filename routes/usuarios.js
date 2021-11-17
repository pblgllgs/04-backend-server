/* ruta /api/usuarios */

const { Router } = require('express');

const {getUSuarios, crearUsuario} = require('../controllers/usuarios')

const router = Router();


//rutas
router.get('/', getUSuarios );

router.post('/new', crearUsuario );




module.exports = router;