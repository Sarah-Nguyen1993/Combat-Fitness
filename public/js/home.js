$(document).ready(function () {
    
    $("#calculate").on("click", function () {
        calories()
    })

    $("#goalsave").on("click", function(){
        goals()

    })


    function calories() {
        const gender = $(".gender").val()
        const age = $(".age").val()
        const height = $(".height").val()
        const weight = $(".weight").val()
        const activity = $("#inputGroupSelect01").val()
        const goal = $("#inputGroupSelect02").val()
        const rate = $("#inputGroupSelect03").val()


        $("div").removeClass("hide")
        console.log(gender, age, height, weight, activity, goal, rate)
    }
})

function goals(){
    const goal = $("#goaltext").val()
    console.log(goal)
}





