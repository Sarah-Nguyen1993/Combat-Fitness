$(document).ready(function () {
    const recipeArea = $(".recipe-area");
    $.get("/api/user_data").then(function (user) {
      userID = user.id;
      console.log(user);
      renderRecipe(userID);
    });
  
    function renderRecipe(userID) {
      $.get("/api/recipes/" + userID).then((data) => {
        console.log("data", data);
        recipeArea.append(
          data.map((meal) => {
            console.log("mealid", meal.id);
            return /*html*/ `
                    <div data-id=${meal.id}>
                      <hr>
                      <h3>${meal.title}</h3>
                      <p>Servings: ${meal.serving}</p>
                      <p>Prep_time: ${meal.prep_time} mins</p>
                      <a href = '${meal.prep_time}'>Recipe</a> 
                      <br>
                      <br>
                      <button type="button" class="btn btn-primary btn-sm"  id = "${meal.id}">Delete</button>
                    </div>
                `;
          })
        );
        data.map((meal) => {
          $(`#${meal.id}`).click(function () {
            $.ajax({
              method: "DELETE",
              url: "api/recipes/" + meal.id,
            }).then(() => {
                $(`[data-id=${meal.id}]`).remove();
            });
          });
        });
      });
    }
  });