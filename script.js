 function getPlayerName (){
  var playerName = $('#playerName');
  var pullInfo = window.location.href;
  var order = pullInfo.toString();
  order = order.split('=').pop();
  playerName.replaceWith(order);
}

getPlayerName();

$(function(){

var board = $('#board');
var car = $('.car');
var gameOver = false;
var gamePaused = false;
var pauseButton = $('pauseButton')

var obstacle = $('.obstacle');
var speed = 10;
var score = -6;
var level = 1;
var playerName = $('#playerName');
var scoreBoard = $('#score');
var levelBoard = $('#level');
var obstacleRightDefault;

var boardHeight = parseInt(board.height());
var boardWidth = parseInt(board.width());
var carHeight = parseInt(car.height());
var carWidth = parseInt(car.width());
var obstacleInitialPostion = parseInt(obstacle.css('top'));
var obstacleInitialWidth = parseInt(obstacle.css('right'));

// setInterval that moves the obstacle elements
var startGame = setInterval (function(){
  obstacleCurrentPosition = parseInt(obstacle.css('top'));

  // regenerates the obstacle cars when they have traveled 1.4 times the length of the game board, randomizing the starting height, width and velocity
  if(obstacleCurrentPosition > (1.4 * (boardHeight))){
    obstacle.each(function(){
      obstacleCurrentPosition = obstacleInitialPostion;
      var startPosition = randomizeObstacle(-300, -700);
      $(this).css('top', startPosition);
      $(this).css('margin', randomizeObstacle (25, 50));
      $(this).css('right', randomizeObstacle(0, 500));
      // levels, makes the game harder after the user has dodged a given number of obstacles
      if (score === 35){
        alert("Level Two Reached! Obstacles are Faster!")
        level++;
        levelBoard.text(level);
      } if (score === 75){
        alert("Level Three Reached! Obstacles are Faster!");
        level++;
        levelBoard.text(level);
      } if (score < 35){
        speed = randomizeObstacle(8,11);
      } if (35 < score < 75){
        speed = randomizeObstacle(11,15);
      } if (score > 75){
        speed = randomizeObstacle(15,17);
      }
      // adds a point to the scoreboard as each car is generated (score starts at -6)
      score++;
      scoreBoard.text(score);
    });

  } else{
    // moves the obstacle elements
    obstacle.each(function() {
      var obstacleNewPosition = parseInt($(this).css('top'));
      $(this).css('top', obstacleNewPosition + speed);
      // collision detection, ends the game on a collision in relation to the car's and obstacles' relative offsets
      if ((Math.abs(($(this).offset().top) - car.offset().top) < carHeight && Math.abs(($(this).offset().left) - (car.offset().left)) < carWidth)){
      gameOver = true
    };
  })
  }

  // Ends the game if the player steers into any of the walls
  if (parseInt(car.css('top')) <= -2 || parseInt(car.css('top')) >= boardHeight - carHeight || parseInt(car.css('right')) <= -2 || parseInt(car.css('right')) >= boardWidth - carWidth){
    gameOver = true;
  }

  // 'Game over' conditions - clears the game interval, fires an alert message, ends the background road animation, displays the user's score & disables the player car movement
  if (gameOver === true){
    clearInterval(startGame);
    alert('Game Over! Your score is ' + score);
    $('#board').css("animation", "none");
    $(document).off('keydown')
    };

}, 50);

// Uses an alert to pause the game
$('#pause-button').click(function(){
    alert('Game Paused');
  });

// The math.random function that is pulled above to randomize the obstacles' start width, start height and velocity
randomizeObstacle = function (min, max){
  min=Math.ceil(min);
  max=Math.floor(max);
  return Math.floor(Math.random() * (max-min)) + min;
}

// Player car movement inputs
$(document).on('keydown', function(event){
  var key = event.keyCode;
  if (key === 65){
    moveLeft();
  } if (key === 68){
    moveRight();
  } if (key === 87){
    moveUp();
  } if (key === 83){
    moveDown();
  }

  function moveLeft(){
    // console.log ('65 pressed');
    parseInt(car.animate({'margin-left': '-=10'}, 40))
  }

  function moveRight(){
    // console.log ('39 pressed');
    parseInt(car.animate({'margin-left': '+=10'}, 40));
  }

  function moveUp(){
    // console.log ('87 pressed');
    parseInt(car.animate({'margin-bottom': '+=10'}, 40));
  }

  function moveDown(){
    // console.log ('83 pressed');
    parseInt(car.animate({'margin-bottom': '-=10'}, 40));
    }
  })

});







