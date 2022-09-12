/*
    Ruta: /api/usuarios
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar-campo');
const { validarJWT, validarADMIN_ROLE, validarADMIN_ROLE_o_MismoUsuario } = require('../middleware/validar-jwt');

const { getUsuarios, crearUsuarios, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');

const router = Router();

router.get( '/', validarJWT, getUsuarios);

router.post( '/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'La contraseña es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos,
    ],
    crearUsuarios
);

router.put( '/:id',
    [
        validarJWT,
        validarADMIN_ROLE_o_MismoUsuario,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('role', 'El role es obligatorio').notEmpty(),
        validarCampos,
    ],
    actualizarUsuario 
);
router.delete( '/:id',
    [validarJWT, validarADMIN_ROLE],
    borrarUsuario 
);


module.exports = router;
