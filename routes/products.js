/* 
    Rutas de estudiantes / Auth
    host + /api/students
*/

const express = require('express');

const { validarJWT } = require('../middlewares/validar-jwt');
const { 
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    eliminarProducto } = require('../controllers/products');
const { validarProducto } = require('../middlewares/validar-campos-alumno');
const router = express.Router();

router.use( validarJWT );

router.get('/', obtenerProductos);
router.get('/:id', obtenerProducto);
router.post('/', validarProducto, crearProducto);
router.put('/:id', validarProducto ,actualizarProducto);
router.delete('/:id', eliminarProducto);


module.exports = router;