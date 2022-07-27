/* 
    Busqueda
    ruta: api/todo/
*/


const { Router } = require('express');
const { getBusquedas, getDocumentosColeccion } = require('../controllers/busquedas');
const { validarJWT } = require('../middleware/validar-jwt');


const router = Router();

router.get( '/:busqueda', validarJWT, getBusquedas);

router.get( '/coleccion/:tabla/:busqueda', validarJWT, getDocumentosColeccion);


module.exports = router;
