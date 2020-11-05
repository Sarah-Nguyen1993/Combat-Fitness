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
    const recipeInfo = {
      calories: caloricInput.val().trim(),
      dietType: dietType.val().trim(),
      exclusion: exclude.val().trim()
    };
  
    if (!recipeInfo.calories){
      return;
    }
  
    $.post("/recipes", recipeInfo)
    .then(data => {
        console.log(data);
        renderRecipes(data);  
        nutritionRenderer(data)
      })
  }) 
  
  function renderRecipes(data){
      const meals = data.meals;
      meals.map(meal => {
        console.log(meals.indexOf(meal))
        const {title, readyInMinutes, servings, sourceUrl } = meal;
        recipes.append(
          $("<div>").append(
            $("<h2>").text(title),
            $("<p>").text("Preparation Time: " + readyInMinutes + " minutes"),
            $("<p>").text("Serving: " + servings),
            $("<p>").append(`<a href = '${sourceUrl}', target = '_blank'>Recipe`),
            $(`<button class ='btn btn-default save-btn'id =${meals.indexOf(meal)} >`).text("Save")
          )
        );
        
      //   //When use hit save button, the recipe will be saved to the database
      //   $(`#${meals.indexOf(meal)}`).click( function(){
      //     console.log(meals.indexOf(meal))
      //     const order = meals.indexOf(meal);
      //     const {title, readyInMinutes, servings, sourceUrl } = meals[order]
      //     console.log(title, readyInMinutes, servings, sourceUrl);
      //     const savedRecipe = {
      //       title: title, 
      //       prep_time: readyInMinutes, 
      //       servings: servings,
      //       sourceUrl: sourceUrl
      //     }
      //     $.post("/api/recipes", savedRecipe)
      //     .then( data => {
      //       console.log(data);
      //       alert("Adding recipe...");
      //     })
      //   })
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
