/*
    Ruta: /api/login
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validarCampos } = require('../middleware/validar-campo');

const router = Router();


router.post( '/', 
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La contraseña es obligatorio').notEmpty(),
        validarCampos
    ],
    login
)


module.exports = router;