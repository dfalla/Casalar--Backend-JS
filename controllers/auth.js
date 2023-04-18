const { User } = require('../models/user');

const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');


//req -> lo que la persona solicita
//res -> lo que el servidor responde

const registerUser = async (req, res = response) => {

    const { nombre, apellido, username, password } = req.body;
    console.log({ nombre, apellido, username, password })

    // Validamos si el usuario ya existe en la base de datos
    const user = await User.findOne({ where: { username: username } });

    if(user) {
       return res.status(400).json({
            msg: `Ya existe un usuario ${username}`
        })
    } 
 
    const hashedPassword = await bcrypt.hash(password, 10);
    
    try {
        // Guardarmos usuario en la base de datos
        const usuario = await User.create({
            nombre, 
            apellido,
            username: username,
            password: hashedPassword
        })

        const token = await generarJWT({uid: usuario.dataValues.id, name: usuario.dataValues.nombre});

        res.json({
            msg: `Usuario ${username} creado exitosamente!`,
            nombre: usuario.dataValues.nombre,
            apellido: usuario.dataValues.apellido,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            status: 500,
            msg: 'Por favor hable con el administrador'
        })
    }
}


const loginUser = async (req, res = response ) => {

    const { username, password } = req.body;

   // Validamos si el usuario existe en la base de datos
   try {
    const user= await User.findOne({ where: { username: username } });

   if(!user) {
        return res.status(400).json({
            msg: `No existe un usuario con el nombre ${username} en la base datos`
        })
   }

   // Validamos password
   const passwordValid = await bcrypt.compare(password, user.password)
   if(!passwordValid) {
    return res.status(400).json({
        msg: `Password Incorrecta`
    })
   }

   // Generamos token
   const token = await generarJWT({uid: user.id, name: user.nombre});
   
    res.status(200).json({
        ok:true,
        msg: 'Usuario Logueado',
        uid: user.id,
        nombre: user.nombre,
        apellido: user.apellido,
        token
    })
   } catch (error) {
    console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
   }
}

const revalidarToken = async(req, res = response) => {

    const { uid, name } = req;

    //generar un nuevo JWT y retornarlo en esta peticion
    const token = await generarJWT(uid, name);

    res.json({
        ok: true, 
        name,
        uid,
        token
        
    })
}

module.exports = {
    registerUser,
    loginUser,
    revalidarToken
}