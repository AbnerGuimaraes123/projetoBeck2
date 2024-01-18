
const fs = require('fs');
var archiver = require('archiver');
var path = require('path');
module.exports.index = function(app,req,res){
    var connection = app.config.dbConnection();
    var projetosModel = new app.app.models.projetosDAO(connection);
    projetosModel.getProjetos(function(error,result){
        res.render("home/index", {JProjetos : result, flagUsuario : req.session.id_user});
    });   
}
module.exports.projeto = function(app,req,res){
    var connection = app.config.dbConnection();
    var projetosModel = new app.app.models.projetosDAO(connection);
    var id_projeto = req.query;

    projetosModel.getProjeto(id_projeto, function(error,result){
        res.render("home/projeto", {JProjetos : result, flagUsuario : req.session.id_user});
    });   
}
module.exports.downloadArq = function(app,req,res){
    const localPath = req.query.local;
    res.download(localPath);
}

module.exports.downloadProjeto = function(app,req,res){
    const folderPath = req.query.local;
    const nomeProjeto = req.query.nomeP;
    const archive = archiver('zip', { zlib: { level: 9 } });
    const output = fs.createWriteStream(path.join(folderPath, `${nomeProjeto}.zip`));

    archive.pipe(output);

    archive.directory(folderPath, false);

    archive.finalize();

    output.on('close', function () {
        const zipPath = path.join(folderPath, `${nomeProjeto}.zip`);
        res.download(zipPath, `${nomeProjeto}.zip`, function (err) {
            fs.unlink(zipPath, function (err) {
                if (err) {
                    console.error('Erro ao excluir arquivo zip:', err);
                }
            });
        });
    });
}
module.exports.busca = function(app,req,res){
    var busca = req.body;
    
    var connection = app.config.dbConnection();    
      var buscaProjetossModel = new app.app.models.projetosDAO(connection);
      buscaProjetossModel.getBusca(busca,function(error,result){
       res.render("home/index",{JProjetos : result, flagUsuario : req.session.id_user});
      });
}
