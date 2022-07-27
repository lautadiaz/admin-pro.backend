/*
    Hospitales
    Ruta: /api/hospitales
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar-campo');
const { validarJWT } = require('../middleware/validar-jwt');

const { crearHospital, getHospital, actualizarHospital, borrarHospital } = require('../controllers/hospitales');

const router = Router();

router.get( '/', getHospital);

router.post( '/',
    [
        validarJWT,
        check('nombre', 'El nombre del hospital es obligatorio').notEmpty(),
        validarCampos
    ],
    crearHospital
);

router.put( '/:id',
    [],
    actualizarHospital
);
router.delete( '/:id',
    borrarHospital
);


module.exports = router;
