$(document).ready(function() {
    const videoList = $("#video-list")
    $.get("/api/bulk").then(response => {
        console.log(response);
        // const videoItems = response[0];
        response.forEach(item => {
            // console.log("get videos")
            const videoId = item.id.videoId;
            console.log("get videos")

            const info = $(`
                <div class="col-6 m-6 p-2">
                <iframe width="100%" height="auto" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>           
            `)
            videoList.append(info);
            console.log("list")
        });
    })
});