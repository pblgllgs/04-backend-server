/* ruta /api/usuarios */

const { Router } = require('express');
const { check } = require('express-validator');

const {getUsuarios, crearUsuario} = require('../controllers/usuarios');
const { validarCampos } = require('../middleware/validar-campos');

const router = Router();


//rutas
router.get('/', getUsuarios );

router.post(
    '/new',
    [
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('password','El password es obligatorio').not().isEmpty(),
        check('email','El email es obligatorio').isEmail(),
        validarCampos
    ],
    crearUsuario
);




module.exports = router;