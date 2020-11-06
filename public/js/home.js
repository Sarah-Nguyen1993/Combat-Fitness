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
  
    const form = $(".form");
    const recipes = $(".recipe-area");
    const nutrition = $(".nutrition-area");
    let caloricInput = $("#caloric-input");
    let dietType = $("#diet-type");
    let exclude = $("#exclude");
    form.on("submit", function (event) {
      event.preventDefault();
      if (caloricInput.val().trim() === ""){
        return;
      }
      $(".hide2").removeClass("hide")
      $(".hide3").removeClass("hide")
      const recipeInfo = {
        calories: caloricInput.val().trim(),
        dietType: dietType.val().trim(),
        exclusion: exclude.val().trim()
      };
  
      if (!recipeInfo.calories) {
        return;
      }
  
      $.post("/recipes", recipeInfo)
        .then(data => {
          console.log(data);
          renderRecipes(data);
          nutritionRenderer(data)
        })
    })
  
    //Recipes found from external api call are rendered on the page
    function renderRecipes(data) {
      const meals = data.meals;
      meals.map(meal => {
        console.log(meals.indexOf(meal))
        const { title, readyInMinutes, servings, sourceUrl } = meal;
        recipes.append(
          $("<div>").append(
            $("<h2>").text(title),
            $("<p>").text("Preparation Time: " + readyInMinutes + " minutes"),
            $("<p>").text("Serving: " + servings),
            $("<p>").append(`<a href = '${sourceUrl}', target = '_blank'>Recipe`),
            $(`<button class ='btn btn-default save-btn'id =${meals.indexOf(meal)} >`).text("Save")
          )
        );
  
        //When hit save button, the recipe will be saved to the database
        $(`#${meals.indexOf(meal)}`).click(function () {
          const order = meals.indexOf(meal);
          const { title, readyInMinutes, servings, sourceUrl } = meals[order]
          console.log(title, readyInMinutes, servings, sourceUrl);
          const savedRecipe = {
            title: title,
            prep_time: readyInMinutes,
            servings: servings,
            sourceUrl: sourceUrl,
          };
          
          $.get("/api/user_data").then(function (user) {
            const userID = user.id;
            $.post("/api/recipes/" + userID, savedRecipe)
              .then(data => {
                console.log(data);
              })
          });
          
        })
      });
    };
  
    //Nutrition information is rendered too
    function nutritionRenderer(data) {
      nutrition.append(
        $("<h2>").text("Nutrition Summary:"),
        $("<p>").text("Total calories: " + data.nutrients.calories),
        $("<p>").text("Total carbohydrates: " + data.nutrients.carbohydrates),
        $("<p>").text("Total fat: " + data.nutrients.fat),
        $("<p>").text("Total protein: " + data.nutrients.protein),
      );
    };
});
  




