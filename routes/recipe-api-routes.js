var axios = require("axios").default;
require("dotenv").config();
module.exports = function(app){
	app.post("/recipes", function(req,res){
		const options = {
			method: 'GET',
			url: 'https://rapidapi.p.rapidapi.com/recipes/mealplans/generate',
			params: {
			  timeFrame: 'day',
			  targetCalories: req.body.calories,
			  diet: req.body.dietType,
			  exclude: req.body.exclusion
			},
			headers: {
			  'x-rapidapi-key': process.env.RECIPE_API_KEY,
			  'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
			}
		};
		  
		  axios.request(options)
		  	.then(function (response) {
			  console.log(response.data);
			  res.json(response.data)

			})
			.catch(function (error) {
			  console.error(error);
		  	});
	})
		
}

// const db = require("../models");
// module.exports = function(app){
//     app.get("/api/recipes", function(req,res){
//         db.Recipe.findAll({
//             include:[db.User]
//         }).then(function(dbRecipe){
//             res.json(dbRecipe)
//         }).catch(err => {
//             console.log(err);
//             res.status(500).end();
//         });
//     });

//     app.post("/api/recipes", function(req,res){
//         db.Recipe.create({
//             title: req.body.title, 
//             prep_time: req.body.prep_time, 
//             servings: req.body.servings,
//             sourceUrl: req.body.sourceUrl
//         }, 
//         ).then(dbRecipe => {
//             res.json(dbRecipe)
//         }).catch(err => {
//             console.log(err);
//             res.status(500).end();
//         });
//     })

//     // app.delete("/api/recipes/:id", function(req,res){
//     //     db.Recipe.destroy({
//     //         where: {
//     //             id: req.params.id
//     //         }
//     //     }).then(dbRecipe => {
//     //         res.json(dbRecipe)
//     //     })
//     // })
// }