const {db} = require('./connection');

const databaseConnection = async () => {

    try {
        
        await db.authenticate();
        console.log('Base de datos conectada 😍');

    } catch (error) {
        console.log(error)
    }

}

module.exports = {
    databaseConnection
}