const { Sequelize } = require('sequelize');

const db = new Sequelize('inventario', 'root', '16falladapeta03', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    define:{
        timestamps: false
    }
});

module.exports = {
    db
};