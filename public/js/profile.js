$(document).ready(function () {
    const recipeArea = $(".recipe-area");
    const videoArea = $(".video-area");
    $.get("/api/user_data").then(function (user) {
      userID = user.id;
      console.log(user);
      renderRecipe(userID);
      renderVideo(userID);
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
    };

    function renderVideo(userID) {
      $.get("/api/plans/" + userID).then((data) => {
        videoArea.append(
          data.map(video => {
            videoUrl = video.videoUrl;
            console.log("video id", video.id)
            return /*html*/ `
              <div class="col-6 m-6 p-2" data-id = '${video.id}'>
              <iframe width="100%" height="auto" src= '${videoUrl}' frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
              <button class = "btn btn-primary btn-sm"  >Delete</button>
              </div>   
            `;
          })
        );
        
        data.map(video => {
          $(`[data-id=${video.id}]`).click(function () {
            console.log("hey")
            $.ajax({
              method: "DELETE",
              url: "api/plans/" + video.id,
            }).then(() => {
                $(`[data-id=${video.id}]`).remove();
            });
          });
        });
      });
    };
  });