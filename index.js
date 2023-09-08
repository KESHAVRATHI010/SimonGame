var btnColors = ["red", "blue", "green", "yellow"];
var gamepattern = [];
var userpattern = [];
var started = false;
var level = 0;

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextsequence();
    started = true;
  }
});

$(".btn").click(function () {
  var userchosencolor = $(this).attr("id");
  userpattern.push(userchosencolor);
  playsound(userchosencolor);
  animatepress(userchosencolor);
  checkAnswer(userpattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamepattern[currentLevel] === userpattern[currentLevel]) {
    if (userpattern.length === gamepattern.length) {
      setTimeout(function () {
        nextsequence();
      }, 1000);
    }
  } else {
    playsound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over");
    setTimeout(function () {
      $("body").removeClass("game-over");
      $("#level-title").text("Press any key to Restart");
    }, 400);
    startover();
  }
}

function nextsequence() {
  userpattern = [];
  level++;
  $("#level-title").text("Level - " + level);
  var randomnumber = Math.floor(Math.random() * 4);
  var randomChosenColor = btnColors[randomnumber];
  gamepattern.push(randomChosenColor);
  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playsound(randomChosenColor);
}

function animatepress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playsound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startover(){
  level=0;
  gamepattern=[];
  started=false;
}