var DIR={
    DIR_LEFT:1,
    DIR_TOP:2,
    DIR_RIGHT:3,
    DIR_BOTTOM:4
}

var map = {width:800,height:500};
var span = {width:25, height:25};
var layout = {
    wNum:map.width/span.width,
    hNum:map.height/span.height
};

var snake =[],
    space = [],
    dir = DIR.DIR_RIGHT;

//variable that stores the information of scores.
var currentScore=0;


var scoreBoard;


window.onload=function(){
    var diffSelc = document.getElementById('game');
    diffSelc.style.width = map.width + "px";
    diffSelc.style.height = map.height + "px";
}
function reload(){
    var diffSelc = document.getElementById('game');
    diffSelc.style.width = map.width + "px";
    diffSelc.style.height = map.height + "px";
}

// function to start the game with selected difficulity.
function startGame(difficulity){ 
    scoreBoard = document.getElementById("scoreBoard");
    scoreBoard.innerHTML = "SCORE: "+ currentScore;
    initMap();
    generateTarget();
    setInterval(moveSnack,difficulity);
    document.onkeyup=function(e){
        switch(e.keyCode){
            case 37: 
                if (dir == DIR.DIR_RIGHT) {
                    break;
                } else {
                    dir=DIR.DIR_LEFT;
                    break;
                }
            case 38: 
                if (dir == DIR.DIR_BOTTOM) {
                    break;
                } else {
                    dir=DIR.DIR_TOP;
                    break;
                }
            case 39: 
               if (dir == DIR.DIR_LEFT) {
                    break;
                } else {
                    dir=DIR.DIR_RIGHT;
                    break;
                }
            case 40: 
                if (dir == DIR.DIR_TOP) {
                    break;
                } else {
                    dir=DIR.DIR_BOTTOM;
                    break;
                }

            default: break;
        }
    }

}

function initMap(){
    var gameMap = document.getElementById("game");
    gameMap.innerHTML = "";
    gameMap.style.width = map.width + "px";
    gameMap.style.height = map.height + "px";
    var newSpan = null;
    for (var i=1;i<=layout.wNum*layout.hNum;i++){
        newSpan = document.createElement("span");
        newSpan.style.width = span.width + "px";
        newSpan.style.height = span.height + "px";
        newSpan.id = i;
        gameMap.appendChild(newSpan);
        if(i<=10){
            newSpan.className = 'snake';
            snake.push(newSpan);
        } else {
            space.push(newSpan);
        }
    }



    
}
function generateTarget(){
    var i = Math.floor(Math.random()*space.length);
    space[i].className = "target";
}

function moveSnack(){
    //Get the next position of the snake's head.
    var headID;

    switch(dir){
        case DIR.DIR_LEFT:{
            headID = parseInt(snake[snake.length-1].id)-1;
            if(headID % layout.wNum == 0) {headID += layout.wNum;}
            break;
        }

        case DIR.DIR_TOP:{
            headID = parseInt(snake[snake.length-1].id)-layout.wNum;
            if(headID < 1) {headID += layout.wNum*layout.hNum;}
            break;
        }

        case DIR.DIR_RIGHT:{
            headID = parseInt(snake[snake.length-1].id)+1;
            if(headID % layout.wNum ==1) {headID -=layout.wNum;}
            break;
        }
        case DIR.DIR_BOTTOM:{
            headID = parseInt(snake[snake.length-1].id)+layout.wNum;
            if(headID > layout.wNum*layout.hNum) {headID-=layout.wNum*layout.hNum;}
            break;
        }

        default:break;
    }
    // Determine if the game is over.
    var head = document.getElementById(headID);
    for(var i=0; i<snake.length-1; i++){
        if(headID == snake[i].id){

            alert('Game Over!');
            window.location.href=window.location.href;
        }
    }
    // Get the index of the new postion of snake's head, move the postion from
    // space array to snake array.
    var index;
    for (var i = 1; i<space.length;i++){
        if(headID ==space[i].id){
            index = i;
            break;
        }
    }
    space.splice(index,1);
    snake.push(head);
    
    // if the snake hit the target, the length of the snake increases by 1,
    // otherwise, the tail of the snake is deleted since the snake is moving 
    //forward.
    if(head.className=="target"){
        updateScore();
        generateTarget();
    } else {
        snake[0].className = '';
        space.push(snake.shift());
    }    
    head.className = 'snake';
}

function updateScore(action) {

        currentScore ++;
        scoreBoard = document.getElementById("scoreBoard");
        scoreBoard.innerHTML = "SCORE: "+ currentScore;

    
}
