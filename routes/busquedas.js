/* ruta /api/todo/ */

const { Router } = require('express');
const router = Router();

const  {getTodo, getDocumentosColeccion}  = require('../controllers/busquedas');

const { validarJWT } = require('../middleware/validar-jwt');


//rutas
router.get(
    '/:busqueda',
     [
        validarJWT
    ], 
    getTodo
);

router.get(
    '/coleccion/:tabla/:busqueda',
     [
        validarJWT
    ], 
    getDocumentosColeccion
);


module.exports = router;