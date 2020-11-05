const db = require("../models");
module.exports = function(app){
    app.get("/api/recipes", function(req,res){
        db.Recipe.findAll({
            include:[db.User]
        }).then(function(dbRecipe){
            res.json(dbRecipe)
        }).catch(err => {
            console.log(err);
            res.status(500).end();
        });
    });

    app.post("/api/recipes", function(req,res){
        db.Recipe.create({
            title: req.body.title, 
            prep_time: req.body.prep_time, 
            servings: req.body.servings,
            sourceUrl: req.body.sourceUrl
        }, 
        ).then(dbRecipe => {
            res.json(dbRecipe)
        }).catch(err => {
            console.log(err);
            res.status(500).end();
        });
    })

    // app.delete("/api/recipes/:id", function(req,res){
    //     db.Recipe.destroy({
    //         where: {
    //             id: req.params.id
    //         }
    //     }).then(dbRecipe => {
    //         res.json(dbRecipe)
    //     })
    // })
}