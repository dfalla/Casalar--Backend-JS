/* 
    Rutas de usuarios / Auth
    host + /api/auth

*/

const express = require('express');
const {  validarCamposLogin, validarCamposRegistro } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = express.Router();
const {
    registerUser, 
    loginUser,
    revalidarToken
} = require('../controllers/auth');


router.post('/register',validarCamposRegistro, registerUser);

router.post('/login',validarCamposLogin, loginUser);

router.get('/renew', validarJWT ,revalidarToken);



module.exports = router;