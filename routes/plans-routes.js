const axios = require("axios");
require("dotenv").config();

module.exports = function (app) {

    app.get("/api/bulk", function (req, res) {

        axios.get("https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&order=relevance&q=workout%20plans%20for%20bulking%20up%20&type=video&key=" + process.env.YOUTUBE_API_KEY)
            .then(response => {
                console.log(response.data)
                res.json(response.data.items);
            }).catch(err => {
                console.log(err);
            });
    });

    app.get("/api/lean", function (req, res) {

        axios.get("https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&order=relevance&q=workout%20plans%20to%20get%20lean&type=video&key=" + process.env.YOUTUBE_API_KEY)
        .then(response => {
            res.json(response.data.items);
        }).catch(err => {
            console.log(err);
        });
    });

    app.get("/api/hiit", function (req, res) {

        axios.get("https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&order=relevance&q=hiit%20workouts&type=video&key=" + process.env.YOUTUBE_API_KEY)
        .then(response => {
            res.json(response.data.items);
        }).catch(err => {
            console.log(err);
        });
    });

};