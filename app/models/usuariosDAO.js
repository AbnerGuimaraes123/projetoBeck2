function UsuariosDAO(connection){
    this._connection = connection;
}

UsuariosDAO.prototype.getLogin = function(camposDeUsuario, callback){
    this._connection.query('SELECT id_user FROM usuarios WHERE login = ? AND senha = ? ', [camposDeUsuario.login, camposDeUsuario.senha],callback);
};
UsuariosDAO.prototype.cadastrarUsuario = function(usuario,callback){
    this._connection.query('INSERT INTO usuarios SET ?',usuario,callback);
};
UsuariosDAO.prototype.verificaLogin = function(campoLogin, callback){
    this._connection.query('SELECT id_user FROM usuarios WHERE login = ?', campoLogin,callback);
};

module.exports = function(){
    return UsuariosDAO;
}