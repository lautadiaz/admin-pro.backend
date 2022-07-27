/*
    Medicos
    Ruta: /api/medicos
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { getMedico, crearMedico, actualizarMedico, borrarMedico } = require('../controllers/medicos');
const { validarCampos } = require('../middleware/validar-campo');
const { validarJWT } = require('../middleware/validar-jwt');


const router = Router();

router.get( '/', getMedico);

router.post( '/',
    [
        validarJWT,
        check('nombre', 'El nombre del medico es obligatorio').notEmpty(),
        check('hospital', 'El hospital id debe ser valido').isMongoId(),
        validarCampos
    ],
    crearMedico
);

router.put( '/:id',
    [],
    actualizarMedico
);
router.delete( '/:id',
    borrarMedico
);


module.exports = router;
