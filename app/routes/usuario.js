module.exports = function(app){
    app.post('/autenticar',function(req,res){
        app.app.controllers.usuario.login_autenticar(app,req,res);
    });
    app.get('/login',function(req,res){
        app.app.controllers.usuario.form_login(app,req,res);
    });
    app.get('/sair',function(req,res){
        app.app.controllers.usuario.sair(app,req,res);
    });

    app.get('/cadastro',function(req,res){
        app.app.controllers.usuario.form_cadastro(app,req,res);
    });
    app.post('/cadastro',  function(req,res){
        app.app.controllers.usuario.cadastro_usuario(app,req,res);
    });

    app.get('/adicionar',function(req,res){
        app.app.controllers.usuario.form_add_projeto(app,req,res);
    });
    app.post('/adicionar', function(req,res){
        app.app.controllers.usuario.projeto_adicionar(app,req,res);
    });

    app.get('/apagar_projeto',function(req,res){
        app.app.controllers.usuario.delete_projeto(app,req,res);
    });

    app.get('/editar',function(req,res){
        app.app.controllers.usuario.from_edit_projeto(app,req,res);
    });
    app.post('/editar',app.upload.array('file[]', 20),function(req,res){
        app.app.controllers.usuario.editar(app,req,res);
    });
    app.get('/ExcluirArq', function (req, res) {
        app.app.controllers.usuario.ExcluirArq(app,req,res);

    });
    app.get('/MeusProjetos', function (req, res) {
        app.app.controllers.usuario.MeusProjetos(app,req,res);

    });

}