var fs = require('fs');


module.exports.form_login = function (app, req, res) {
    res.render("usuarios/form_login", { validacao: {}, flagUsuario: req.session.id_user });
}

module.exports.login_autenticar = function (app, req, res) {
    var camposDeLogin = req.body;
    req.assert('login', 'Usuário é obrigatório').notEmpty();
    req.assert('senha', 'Senha é obrigatória').notEmpty();
    var erros = req.validationErrors();
    if (erros) {
        res.render("usuarios/form_login", { validacao: erros, flagUsuario: req.session.id_user });
        return;
    }
    var connection = app.config.dbConnection();
    var autenticacao = new app.app.models.usuariosDAO(connection);
    autenticacao.getLogin(camposDeLogin, function (error, result) {
        if (result.length == 0) {
            var erro = [];
            erro.push({ msg: 'Usuário ou senha incorretos!' });
            res.render("usuarios/form_login", { validacao: erro, flagUsuario: req.session.id_user });
            return;
        }
        req.session.id_user = result[0].id_user;
        res.redirect('/');
    });
}

module.exports.sair = function (app, req, res) {
    req.session.destroy(function (error) {
        res.redirect('/');
    });
}

module.exports.form_cadastro = function (app, req, res) {
    res.render("usuarios/form_cadastro", { validacao: {}, usuario: {}, flagUsuario: req.session.id_user });
}

module.exports.cadastro_usuario = function (app, req, res) {
    var usuario = req.body;
    req.assert('nome', 'nome é obrigatório').notEmpty();
    req.assert('senha', 'senha é obrigatório').notEmpty();
    req.assert('login', 'login deve conter entre 5 e 100 caracteres').len(5, 100);
    var erros = req.validationErrors();
    if (erros) {
        res.render("usuarios/form_cadastro", { validacao: erros, usuario: usuario, flagUsuario: req.session.id_user });
        return;
    }
    var connection = app.config.dbConnection();
    var cadastrarUsuarioModel = new app.app.models.usuariosDAO(connection);
    cadastrarUsuarioModel.verificaLogin(usuario.login, function (error, result) {
        if (result.length != 0) {
            var erro = [];
            erro.push({ msg: 'Login ja existe!' });
            res.render("usuarios/form_cadastro", { validacao: erro, usuario: usuario, flagUsuario: req.session.id_user });
        } else {
            cadastrarUsuarioModel.cadastrarUsuario(usuario, function (error, result) {
                res.redirect('/login');
            });
        }
    });
}

module.exports.form_add_projeto = function (app, req, res) {
    if (!isNaN(req.session.id_user)) {
        res.render("usuarios/form_add_projeto", { validacao: {}, JProjetos: {}, flagUsuario: req.session.id_user })
    } else {
        var erro = [];
        erro.push({ msg: 'Usuário precisa fazer login!' });
        res.render("usuarios/form_login", { validacao: erro, flagUsuario: req.session.id_user });
    }
}
module.exports.projeto_adicionar = function (app, req, res) {
    var projeto = req.body;

    req.assert('id_user', 'Algo de errado! Faça login novamente').notEmpty();
    req.assert('nome_projeto', 'Nome projeto é obrigatório').notEmpty();
    req.assert('resumo', 'Resumo projeto é obrigatório').notEmpty();
    req.assert('resumo', 'Resumo deve conter entre 10 e 100 caracteres').len(10, 100);
    req.assert('orientador', 'Orientador é obrigatório').notEmpty();
    req.assert('disciplina', 'Disciplina é obrigatório').notEmpty();
    req.assert('data_inicio', 'Data é obrigatório').notEmpty().isDate({ format: 'YYYY-MM-DD' });

    var erros = req.validationErrors();
    if (erros) {
        res.render("usuarios/form_add_projeto", { validacao: erros, JProjetos: projeto, flagUsuario: req.session.id_user });
        return;
    }
    var connection = app.config.dbConnection();
    var adicionarProjetoModel = new app.app.models.projetosDAO(connection);
    adicionarProjetoModel.adicionarProjeto(projeto, function (error, result) {
        res.redirect('/');
    });
}
module.exports.delete_projeto = function (app, req, res) {

    var connection = app.config.dbConnection();
    var projetoModel = new app.app.models.projetosDAO(connection);
    var id_projeto = req.query;
    projetoModel.apagarArquivos(id_projeto);
    
    var projetoPath = './app/public/uploads/' + id_projeto.id_projeto;
    if (fs.existsSync(projetoPath)) {
        fs.rmSync(projetoPath, { recursive: true });
    }
    projetoModel.apagarProjeto(id_projeto, function (error, result) {
        res.redirect('back');
    });
}

module.exports.from_edit_projeto = function (app, req, res) {
    if (!isNaN(req.session.id_user)) {

        var connection = app.config.dbConnection();
        var projetoModel = new app.app.models.projetosDAO(connection);
        var id_projeto = req.query;
        projetoModel.getProjeto(id_projeto, function (error, result) {
            res.render("usuarios/form_edit_projeto", { JProjetos: result, validacao: {}, flagUsuario: req.session.id_user });
            console.log("Result: "+ result)
        });
    } else {
        var erro = [];
        erro.push({ msg: 'Usuário precisa fazer login!' });
        res.render("usuarios/form_login", { validacao: erro, flagUsuario: req.session.id_user });
    }
}

module.exports.editar = function (app, req, res) {
    var projeto = req.body;
    req.assert('nome_projeto', 'Nome projeto é obrigatório').notEmpty();
    req.assert('resumo', 'Resumo projeto é obrigatório').notEmpty();
    req.assert('orientador', 'Orientador é obrigatório').notEmpty();
    req.assert('disciplina', 'Disciplina é obrigatório').notEmpty();
    req.assert('data_inicio', 'Data é obrigatório').notEmpty().isDate({ format: 'YYYY-MM-DD' });

    var erros = req.validationErrors();
    if (erros) {
        console.log(projeto)
        res.render("usuarios/form_edit_projeto", { validacao: erros, JProjetos: [projeto], flagUsuario: req.session.id_user });
        
        return;
    }
    var connection = app.config.dbConnection();
    var salvarProjetoModel = new app.app.models.projetosDAO(connection);
    salvarProjetoModel.editarProjeto(projeto, function (error, result) {
        if (req.files != undefined) {
            var arq = req.files;
            arq.forEach(arquivo => {
                salvarProjetoModel.adicionarArq(arquivo, projeto.id_projeto);
            });
        }
        res.redirect('/');
    });
}
module.exports.ExcluirArq = function (app, req, res) {

    var connection = app.config.dbConnection();
    var projetoModel = new app.app.models.projetosDAO(connection);
    var id_arq = req.query.id_arq;
    var localPath = req.query.local;
    projetoModel.apagarArquivo(id_arq, function (error, result) {
        if (error) {
            console.error("Erro ao apagar arquivo no banco de dados:", error);
            return;
        }
        fs.unlink(localPath, function (err) {
        });
        res.redirect('back');
    });

}
module.exports.MeusProjetos = function (app, req, res) {


    if (!isNaN(req.session.id_user)) {
        var connection = app.config.dbConnection();
        var projetosModel = new app.app.models.projetosDAO(connection);
        var id_user = req.session.id_user
        projetosModel.getMeusProjetos(id_user, function (error, result) {
            res.render("usuarios/projetosUser", { JProjetos: result, flagUsuario: req.session.id_user });
        });
    } else {
        var erro = [];
        erro.push({ msg: 'Usuário precisa fazer login!' });
        res.render("usuarios/form_login", { validacao: erro, flagUsuario: req.session.id_user });
    }




}