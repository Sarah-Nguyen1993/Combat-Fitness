$(document).ready(function () {
    const recipeArea = $(".recipe-area")
    $.get("/api/user_data").then(function (user) {
        userID = user.id;
        $.get("/api/recipes/" + userID)
          .then(data => {
            console.log(data);
            recipeArea.append(
                data.map(meal => {
                    return /*html*/ `
                    <h3>${meal.title}</h3>
                    <p>Servings: ${meal.serving}</p>
                    <p>Prep_time: ${meal.prep_time}</p>
                    <a href = '${meal.prep_time}'>Recipe</a>
                `
                })
            )
            
           
            
          })
      });
})