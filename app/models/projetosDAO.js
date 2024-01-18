function ProjetosDAO(connection) {
    this._connection = connection;
}

ProjetosDAO.prototype.getProjetos = function (callback) {
    this._connection.query('SELECT id_projeto, id_user, nome_projeto, data_inicio, disciplina, orientador, resumo FROM Projetos ORDER BY data_inicio DESC', callback);
};
ProjetosDAO.prototype.getMeusProjetos = function (id_user, callback) {
    this._connection.query(`
        SELECT 
            Projetos.*, 
            Usuarios.nome AS nome_usuario
        FROM Projetos
        JOIN Usuarios ON Projetos.id_user = Usuarios.id_user
        WHERE Projetos.id_user = ?
        ORDER BY Projetos.data_inicio DESC
    `, id_user, callback);
};

ProjetosDAO.prototype.getProjeto = function(id_projeto, callback) {
    this._connection.query(
        `
        SELECT 
            Projetos.*, 
            Usuarios.nome AS nome_usuario,
            Arquivos.url,
            Arquivos.id_arq,
            Arquivos.nome_arq
        FROM Projetos
        JOIN Usuarios ON Projetos.id_user = Usuarios.id_user
        LEFT JOIN Arquivos ON Projetos.id_projeto = Arquivos.id_projeto
        WHERE Projetos.id_projeto = ?
        `,
        id_projeto.id_projeto,
        callback
    );
};

ProjetosDAO.prototype.adicionarProjeto = function (projeto, callback) {
    this._connection.query('INSERT INTO projetos SET ?', projeto, callback);
};
ProjetosDAO.prototype.apagarProjeto = function (id_projeto, callback) {
    this._connection.query('DELETE FROM projetos WHERE id_projeto = ?', id_projeto.id_projeto, callback);
};

ProjetosDAO.prototype.apagarArquivos = function (id_projeto) {
    this._connection.query('DELETE FROM arquivos WHERE id_projeto = ?', id_projeto.id_projeto);
};

ProjetosDAO.prototype.apagarArquivo = function (id_arq, callback) {
    this._connection.query('DELETE FROM arquivos WHERE id_arq = ?', id_arq, callback);
};

ProjetosDAO.prototype.editarProjeto = function (projeto, callback) {
    this._connection.query('UPDATE projetos SET nome_projeto = ?, data_inicio = ?, disciplina = ?, orientador = ?, resumo = ? WHERE id_projeto = ?', [projeto.nome_projeto, projeto.data_inicio, projeto.disciplina, projeto.orientador, projeto.resumo, projeto.id_projeto], callback);
};

ProjetosDAO.prototype.adicionarArq = function (arquivo, id_projeto) {
    this._connection.query('INSERT INTO arquivos SET nome_arq = ?, url = ?, id_projeto = ?',
        [arquivo.originalname, arquivo.path, id_projeto]);
};
ProjetosDAO.prototype.getBusca = function (busca, callback) {
    this._connection.query('SELECT id_projeto, id_user, nome_projeto, data_inicio, disciplina, orientador, resumo FROM Projetos WHERE ' + busca.tipoBusca + ' LIKE ? ORDER BY data_inicio DESC', ['%' + busca.termoBusca + '%'], callback);
};


module.exports = function () {
    return ProjetosDAO;
}




