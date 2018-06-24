var DIR={
    DIR_LEFT:1,
    DIR_TOP:2,
    DIR_RIGHT:3,
    DIR_BOTTOM:4
}

var map = {width:800,height:500};
var span = {width:10, height:10};
var layout = {
    wNum:map.width/span.width,
    hNum:map.height/span.height
};
var temp = [];
var snake =[];
var space = []
var dir = DIR.DIR_RIGHT;

window.onload=function(){
    initMap();
    generateTarget();/*
    setInterval(moveSnack,50);*/
    document.onkeyup=function(e){
        switch(e.keyCode){
            case 37: 
                if (dir == DIR.DIR_RIGHT) {
                    continue;
                } else {
                    dir=DIR.DIR_LEFT;
                }
                break;
            case 38: 
                if (dir == DIR.DIR_BOTTOM) {
                    continue;
                } else {
                    dir=DIR.DIR_TOP;
                }
                break;
            case 39: 
               if (dir == DIR.DIR_LEFT) {
                    continue;
                } else {
                    dir=DIR.DIR_RIGHT;
                }
                break;
            case 40: 
                if (dir == DIR.DIR_TOP) {
                    continue;
                } else {
                    dir=DIR.DIR_BOTTOM;
                }
                break;
            default: break;
        }
    }

function initMap(){
    var gameMap = document.getElementById("game");
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
            temp.push(newSpan);
            for (var j = 0; j<=temp.length; j++){
                box = temp.pop();
                snake.push(box);
            }
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
    var headID;
    switch(dir){
        case DIR.DIR_LEFT:
            headID = parseInt(snake[0].id)-1;
            if(headID % layout.wNum == 0) {headID += layout.wNum;}
        case DIR.DIR_TOP:
            headID = parseInt(snake[0].id)-layout.wNum;
            if(headID < 1) {headID += layout.wNum*layout.hNum;}
        case DIR.DIR_RIGHT;
            headID = parseInt(snake[0].id)+1;
            if(headId % layout.wNum ==1) {headID -=layout.wNum;}
        case DIR.DIR_BOTTOM:
            headID = parseInt(snake[0].id)+layout.wNum;
            if(headID > layout.wNum*layout.hNum) {headID-=layout.wNum*layout.hNum;}
        default:break;
    }
    var head = document.getElementById(headID);
    for(var i=1; i<snake.length; i++){
        if(headId == snake.length[i].id){
            alert('Game Over!');
        }
    }
}*/