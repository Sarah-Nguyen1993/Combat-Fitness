$(document).ready(function () {

  $('#calorie-calculator').submit(function(event){
    event.preventDefault();
    calories();
    $("#hide3").removeClass("hide")
  });
function calories(){

  let age = parseInt($('#age').val());
  let sex = $('input[name="sex"]:checked').val();
  let weight = parseFloat($('#weight').val()) * 0.453592;
  let height = parseFloat($("#inches").val()) * 2.54;
  let activity = parseFloat($('.activity_level').val());
  let goal = parseInt($('.gain_loss_amount').val());
  
  let result;
  
	if (sex === 'male') {
    result = (88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)) * activity;
  } else {
    result = (447.593 + (9.247 * weight) + (3.098 * height) - (4.33 * age)) * activity;
  }
  
  result = Math.round(result + goal);
  $("#display").text(result)
  console.log(result) 
  
  
}
     
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
            $("<p>").append(`<a href = '${sourceUrl}', target = '_blank' style="color: white">Recipe`),
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
            title: title, 
            prep_time: readyInMinutes, 
            servings: servings,
            sourceUrl: sourceUrl
          }
         
          $.get("/api/user_data").then(function (user) {
            const userID = user.id;
            $.post("/api/recipes/" + userID, savedRecipe)
            .then(data => {
              alert("Adding recipe...")
            })
          });
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
  




