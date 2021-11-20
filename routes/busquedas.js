/* ruta /api/todo/ */

const { Router } = require('express');
const router = Router();

const  {getTodo}  = require('../controllers/busquedas');

const { validarJWT } = require('../middleware/validar-jwt');


//rutas
router.get(
    '/:busqueda',
     [
        validarJWT
    ], 
    getTodo
);


module.exports = router;