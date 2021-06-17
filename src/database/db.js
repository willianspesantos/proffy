const Database = require('sqlite-async')

function executa(db) {
    //cria tabelas no banco de dados.
    return db.exec(`
        CREATE TABLE IF NOT EXISTS proffys (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT,
            avatar TEXT,
            whatsapp TEXT,
            bio TEXT
        );

        CREATE TABLE IF NOT EXISTS classes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            selecao INTEGER,
            custo TEXT,
            proffy_id INTEGER
        );
            
        CREATE TABLE IF NOT EXISTS cronograma(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            semana INTEGER,
            nesse_tempo INTEGER,
            ate_tempo INTEGER,
            classe_id INTEGER           
        );
    `)
}

module.exports = Database.open(__dirname + '/database.sqlite').then(executa)