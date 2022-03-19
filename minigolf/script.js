function change_to_scorecard(){
    console.log("HELO")
    window.location.href = "http://www.w3schools.com";
}


var canvas = document.getElementById("myCanvas");
canvas.addEventListener("mousedown", doMouseDown, false);
var ctx = canvas.getContext("2d");
canvas.style.width ='100%';
canvas.style.height='100%';

canvas.width = canvas.getBoundingClientRect().width
canvas.height = canvas.getBoundingClientRect().height
var width = canvas.width;
var height = canvas.height;

var mouseX = 0;
var mouseY = 0;

var last_frame = Date.now()
var this_frame = Date.now()








var startx = 100
var starty = 100
var players = 4

var f1width = 86
var theight = 50
var m1width = 68

how_many_loaded = 0

var te = new Image;
te.onload = function() {
    how_many_loaded += 1
}
te.src = "images/card/te.png"

var tf1 = new Image;
tf1.onload = function() {
    how_many_loaded += 1
}
tf1.src = "images/card/tf1.png"

var tf2 = new Image;
tf2.onload = function() {
    how_many_loaded += 1
}
tf2.src = "images/card/tf2.png"

var tf3 = new Image;
tf3.onload = function() {
    how_many_loaded += 1
}
tf3.src = "images/card/tf3.png"

var tm1 = new Image;
tm1.onload = function() {
    how_many_loaded += 1
}
tm1.src = "images/card/tm1.png"

var tm2 = new Image;
tm2.onload = function() {
    how_many_loaded += 1
}
tm2.src = "images/card/tm2.png"

var sf1 = new Image;
sf1.onload = function() {
    how_many_loaded += 1
}
sf1.src = "images/card/sf1.png"

var sm1 = new Image;
sm1.onload = function() {
    how_many_loaded += 1
}
sm1.src = "images/card/sm1.png"

var sm2 = new Image;
sm2.onload = function() {
    how_many_loaded += 1
}
sm2.src = "images/card/sm2.png"

var b = new Image;
b.onload = function() {
    how_many_loaded += 1
}
b.src = "images/card/b.png"

var se = new Image;
se.onload = function() {
    how_many_loaded += 1
}
se.src = "images/card/se.png"


function init() {
    last_frame = Date.now()
    this_frame = Date.now()
    window.requestAnimationFrame(draw);
}



var seconds = 0;

function draw() {
    canvas.width = canvas.getBoundingClientRect().width
    canvas.height = canvas.getBoundingClientRect().height
    width = canvas.width;
    height = canvas.height;

    last_frame = this_frame
    this_frame = Date.now()
    var sec = (this_frame - last_frame) / 1000.0
    seconds += sec;

    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, width, height);
    
    
    ctx.fillStyle = "#000000";
    ctx.fillRect(10, 10, 10, 10);

    if(how_many_loaded == 11){
        thisstart = startx

        if(players == 1)
            ctx.drawImage(tf1, thisstart,starty);
        if(players == 2)
            ctx.drawImage(tf2, thisstart,starty);
        if(players == 3)
            ctx.drawImage(tf3, thisstart,starty);
        if(players > 3){
            ctx.drawImage(tf3, thisstart,starty);
            thisx = thisstart + f1width + m1width*2
            thisp = (players - 3)
            finalx = thisx
            for(let i = 0; i < Math.floor(thisp/2); i++){
                ctx.drawImage(tm2, thisx + m1width*i*2,starty);
                finalx += m1width*2
            }
            if(thisp%2 == 1){
                ctx.drawImage(tm1, finalx,starty);
            }
        }
        if(players == 1)
            ctx.drawImage(sf1, thisstart,starty + theight);
        if(players > 1){
            ctx.drawImage(sf1, thisstart,starty + theight);
            thisx = thisstart + f1width + m1width*2
            thisp = (players - 3)
            finalx = thisx
            for(let i = 0; i < Math.floor(thisp/2); i++){
                ctx.drawImage(tm2, thisx + m1width*i*2,starty);
                finalx += m1width*2
            }
            if(thisp%2 == 1){
                ctx.drawImage(tm1, finalx,starty);
            }
        }
        
    }

    window.requestAnimationFrame(draw);
}


function doMouseDown(e){

    if(e.offsetX) {
        mouseX = e.offsetX;
        mouseY = e.offsetY;
    }
    else if(e.layerX) {
        mouseX = e.layerX;
        mouseY = e.layerY;
    }

    if(mouseX >= tree.x && mouseX <= tree.x + tree.computewidth() && mouseY >= tree.y && mouseY <= tree.y + tree.computeheight()){
        tree.handleclick()
        tree.resetpositions()
        tree.computepositions()
    }
}

init();