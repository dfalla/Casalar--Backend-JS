const { DataTypes } = require('sequelize')
const { db } = require('../database/connection')

const User = db.define('usuarios',{
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellido:{
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = {
    User
}