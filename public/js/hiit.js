$.get("/api/hiit").then(response => {
    const videoList = $("#video-list")
    console.log(response);
    // const videoItems = response[0];
    response.forEach(item => {
        // console.log("get videos")
        const videoId = item.id.videoId;
        console.log("get videos")
        const info = $(`
            <div class="col-6 m-6 p-2">
            <iframe width="100%" height="auto" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <button class = "btn btn-primary btn-sm" data-id = '${videoId}' >Save</button>
            </div>           
        `)
        videoList.append(
            info
        );

        $(`[data-id = ${videoId}]`).click(()=>{
            console.log("data-id", `${videoId}` )
            $.get("/api/user_data").then(function (user) {
                const userID = user.id;
                const savedVideo = {
                    videoUrl: "https://www.youtube.com/embed/" +`${videoId}`
                }
                console.log(savedVideo)
                console.log(videoUrl)
                $.post("/api/plans/" + userID, savedVideo)
                  .then(data => {
                    console.log(data);
                })
            });
        });
        
        
    });
})