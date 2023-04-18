const { isDni } = require('../helpers/isDni');
const { isDate } = require('../helpers/isDate');
const {validarCampos, check} = require('../middlewares/validationResult');

const validarProducto = [
    check("nombre", "Ingrese un nombre")
        .isString()
        .trim()
        .notEmpty(),
    check("descripcion", "Ingrese una descripcion")
        .trim()
        .notEmpty(),
   
    // check("fecha_ingreso", "Fecha de ingreso es obligatorio")
    //     .custom( isDate ),
    
    validarCampos,
]

module.exports = {
    validarProducto
}