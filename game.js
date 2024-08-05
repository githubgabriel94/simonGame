var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;

var buttonColors = ["red", "blue", "green", "yellow"];

var randomChosenColor;

$(".btn").on("click",function(){
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    console.log(userClickedPattern);
    playSound(userChosenColor);
    animatePress(this);
    checkAnswer(userClickedPattern.length - 1);
  });


$(document).on("keydown", function(){
    if(!gameStarted){
        nextSequence(level);
    }
    gameStarted = true;
});

$(document).on("click", function(){
    if(!gameStarted){
        nextSequence(level);
    }
    gameStarted = true;
});


function nextSequence(){
    $("h1").text("Level " +level);
    var rand = Math.random() * 4;
    rand = Math.floor(rand);
    randomChosenColor = buttonColors[rand];
    playSound(randomChosenColor);
    gamePattern.push(randomChosenColor);
    flash(randomChosenColor);
    console.log(gamePattern);
    level++;
}

function playSound(color){

    switch (color) {
        case "red":
            var red = new Audio("sounds/red.mp3");
            red.play();
            break;
        
        case "blue":
            var blue = new Audio("sounds/blue.mp3");
            blue.play();
            break;

        case "green":
            var green = new Audio("sounds/green.mp3");
            green.play();
            break;

        case "yellow":
            var yellow = new Audio("sounds/yellow.mp3");
            yellow.play();
            break;
    
        default:

            break;
    }
}

function flash(color){

    $("#" + color).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}

function animatePress(currentColor) {
    $(currentColor).addClass("pressed");
    setTimeout(function(){
        $(currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLvel){
    if(gamePattern[currentLvel] === userClickedPattern[currentLvel]){
        console.log("success");
        console.log(gamePattern[currentLvel]);
        console.log(userClickedPattern[currentLvel]);
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
            userClickedPattern = [];
        }
    }else{
        console.log("wrong");
        console.log(gamePattern[currentLvel]);
        console.log(userClickedPattern[currentLvel]);
        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart.");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }

}

function startOver(){
    level = 0;
    gamePattern = [];
    setTimeout(function(){
        gameStarted = false;
    }, 200);
    
    userClickedPattern = [];
}