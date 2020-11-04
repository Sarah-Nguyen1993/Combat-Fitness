const db = require("../models");
module.export = function(app){
    app.get("/api/recipes", function(req,res){
        db.Recipe.findAll({
            include:[db.User]
        }).then(function(dbRecipe){
            res.json(dbRecipe)
        });
    });
    app.post("/api/recipes", function(req,res){
        db.Recipe.findAll({
            include:[db.User]
        }).then(dbRecipe => {
            res.json(dbRecipe)
        });
    });
    app.post("api/recipes/:id", function(req,res){
        db.Recipe.create({
            where: {
                id:req.params.id
            }
        }).then(dbRecipe => {
            res.json(dbRecipe)
        })
    })

    app.delete("/api/recipes/:id", function(req,res){
        db.Recipe.destroy({
            where: {
                id: req.params.id
            }
        }).then(dbRecipe => {
            res.json(dbRecipe)
        })
    })
}