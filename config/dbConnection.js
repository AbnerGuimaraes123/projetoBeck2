var mysql = require('mysql');
var connMySQL = function(){
    console.log("Conexão com DB criada!");
    return mysql.createConnection({
        host : 'localhost',
        user : 'root',
        password : '',
        database : 'repositorioprojetos'
    }); 
}
module.exports = function(){
    console.log("Módulo de conexão com DB carregado!");
    return connMySQL;
}
        
