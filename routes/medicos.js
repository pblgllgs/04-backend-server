/* ruta /api/medicos */

const { Router } = require('express');
const { check } = require('express-validator');
const {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
} = require('../controllers/medicos');

const { validarCampos } = require('../middleware/validar-campos');
const { validarJWT } = require('../middleware/validar-jwt');

const router = Router();

//rutas
router.get('/',validarJWT ,getMedicos );

router.post(
    '/new',
    [
        validarJWT,
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('hospital','El id del hospital debe ser válido').isMongoId(),
        validarCampos
    ],
    crearMedico
);

router.put(
    '/:id',
    [],
    actualizarMedico
);

router.delete('/:id',borrarMedico);

module.exports = router;