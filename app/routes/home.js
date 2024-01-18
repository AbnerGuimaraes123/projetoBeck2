
module.exports = function(app){
    app.get('/',function(req,res){
       app.app.controllers.home.index(app,req,res);
    });
    app.get('/projeto',function(req,res){       
        app.app.controllers.home.projeto(app,req,res);
    });
    app.get('/downloadArq', function (req, res) {
        app.app.controllers.home.downloadArq(app,req,res);

    });
    app.get('/downloadProjeto', function (req, res) {
        app.app.controllers.home.downloadProjeto(app,req,res);

    });
    app.post('/busca',function(req,res){
        app.app.controllers.home.busca(app,req,res);
    });
    
}
