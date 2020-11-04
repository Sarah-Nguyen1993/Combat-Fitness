$(document).ready(function () {
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    $.get("/api/user_data").then(function (data) {
      $(".member-name").text(data.email);
    });
   
    const form = $(".form");
    const recipes = $(".recipe-area");
    const nutrition = $(".nutrition-area");
    let caloricInput = $("#caloric-input");
    let dietType = $("#diet-type");
    let exclude = $("#exclude");
    form.on("submit", function (event){
      event.preventDefault();
      $(".hide2").removeClass("hide")
      $(".hide3").removeClass("hide")
      const recipeInfo = {
        calories: caloricInput.val().trim(),
        dietType: dietType.val().trim(),
        exclusion: exclude.val().trim()
      };
  
      if (!recipeInfo.calories){
        return;
      }
    
      getRecipe(recipeInfo.calories, recipeInfo.dietType, recipeInfo.exclusion);
      caloricInput.val("");
      dietType.val("");
      exclude.val("");
    });
  
    
    function getRecipe(caloricInput, dietType, exclude) {
      const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/mealplans/generate?timeFrame=day" + "&targetCalories=" + caloricInput + "&diet=" + dietType + "&exclude=" + exclude,
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
          "x-rapidapi-key": "de8c4e91e0msh15392d59da6b8cap125fcfjsn63f81a1308e8"
        }
      }
  
      $.ajax(settings).done(function (response) {
        console.log(response);
        recipeRenderer(response);
        nutritionRenderer(response);
       
      });
    }
  
    function recipeRenderer(data){
      const meals = data.meals;
      //const savedMeals = [];
      meals.map(meal => {
        console.log(meals.indexOf(meal))
        const {title, readyInMinutes, servings, sourceUrl } = meal;
        recipes.append(
          $("<div>").append(
            $("<h2>").text(title),
            $("<p>").text("Preparation Time: " + readyInMinutes + " minutes"),
            $("<p>").text("Serving: " + servings),
            $("<p>").append(`<a href = '${sourceUrl}', target = '_blank'>Recipe`),
            $(`<button class ='btn btn-default bg-white save-btn'id =${meals.indexOf(meal)} >`).text("Save"),
            $("<hr>")
          )
        );
  
        $(`#${meals.indexOf(meal)}`).click( function(){
          console.log(meals.indexOf(meal))
          const order = meals.indexOf(meal);
          const {title, readyInMinutes, servings, sourceUrl } = meals[order]
          console.log(title, readyInMinutes, servings, sourceUrl);
          const savedRecipe = {
            title, 
            prep_time: readyInMinutes, 
            servings,
            sourceUrl
          }
          // $.post("/api/recipes", 
          // {title, readyInMinutes, servings, sourceUrl },
          // ).then(() => location.reload() )
          $.ajax("/api/recipes", {
            type: "POST",
            data: savedRecipe
          }).then( () => location.reload())
        })
       
       
      });
    };
    function nutritionRenderer(data){
      nutrition.append(
        $("<h2>").text("Nutrition Summary:"),
        $("<p>").text("Total calories: " + data.nutrients.calories),
        $("<p>").text("Total carbohydrates: " + data.nutrients.carbohydrates),
        $("<p>").text("Total fat: " + data.nutrients.fat),
        $("<p>").text("Total protein: " + data.nutrients.protein),
      );
    };
  });
  




