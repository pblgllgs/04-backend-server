/* ruta /api/usuarios */

const { Router } = require('express');
const { check } = require('express-validator');

const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario, cambiaEstadoUsuario } = require('../controllers/usuarios');
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

router.put(
    '/:id',
    [
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('email','El email es obligatorio').isEmail(),
        check('role','El role es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizarUsuario
);

router.delete('/:id',borrarUsuario);

router.post('/:id',cambiaEstadoUsuario);






module.exports = router;