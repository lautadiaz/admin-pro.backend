/*
    Ruta: /api/login
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleLogin, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middleware/validar-campo');
const { validarJWT } = require('../middleware/validar-jwt');

const router = Router();


router.post( '/', 
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La contraseña es obligatorio').notEmpty(),
        validarCampos
    ],
    login
)

router.post( '/google', 
    [
        check('token', 'El token de google es obligatorio').notEmpty(),
        validarCampos
    ],
    googleLogin
)

router.get( '/renew', 
    validarJWT,
    renewToken
)


module.exports = router;