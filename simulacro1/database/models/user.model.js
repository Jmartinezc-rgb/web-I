const bcrypt = require('bcrypt');

users = {};

users.data = {};

users.generateHash = function(password, callback){
    bcrypt.hash(password, 10, callback);
}

users.comparePass = async function(password, hash){
    return await bcrypt.compare(password, hash);
}

users.register = function(username, password){
    if(users.data.hasOwnProperty(username)){
        throw new Error(`Ya existe el usuario ${username}.`);
    }
    users.generateHash(password, function(err, hash){
        if(err){
            throw new Error(`Error al generar el hash de ${username}.`);
        }
        users.data[username] = {
            username, 
            hash, 
            last_Login: new Date().toISOString(),
            cookies: false //inicializo cookies como no aceptadas
        };
    });
}

users.isLoginRight = async function(username, password){
    if(!users.data.hasOwnProperty(username)){
        return false;
    }
    return await users.comparePass(password, users.data[username].hash);
}


users.acceptCookies = function(username) {
    if(users.data.hasOwnProperty(username)) {
        users.data[username].cookies = true;
        console.log(`Cookies accepted for user: ${username}`)
        return true
    } else {
        throw new Error(`Usuario ${username} no encontrado.`);
    }
}

users.hasAcceptedCookies = function(username) {
    if (users.data.hasOwnProperty(username)) {
        console.log(`Cookies ya aceptadas para el usuario: ${username}`)
        return users.data[username].cookies || false;// Devuelve false si no está definido
    } else {
        throw new Error(`Usuario ${username} no encontrado.`);
    }
};


// Función para actualizar la puntuación de un usuario
users.updateScore = function(username, newScore) {
    if (!users.data.hasOwnProperty(username)) {
        throw new Error(`Usuario ${username} no encontrado.`);
    }
    users.data[username].score = newScore;
};

// Función para obtener las puntuaciones ordenadas (de mayor a menor)
users.getHighScores = function() {
    return Object.values(users.data)
        .sort((a, b) => b.score - a.score) // Orden descendente
        .map(user => ({ username: user.username, score: user.score }));
};


module.exports = users;