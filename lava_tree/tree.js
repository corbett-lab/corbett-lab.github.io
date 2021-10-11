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

function init() {
    last_frame = Date.now()
    this_frame = Date.now()
    window.requestAnimationFrame(draw);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function init() {
    window.requestAnimationFrame(draw);
}

function drawCircle(ctx, x, y, radius, fill, stroke, strokeWidth) {
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false)
    if (fill) {
        ctx.fillStyle = fill
        ctx.fill()
    }
    if (stroke) {
        ctx.lineWidth = strokeWidth
        ctx.strokeStyle = stroke
        ctx.stroke()
    }
}



class node{
    constructor(){
        this.parents = []
        this.children = []

        this.label = ""
        this.image = null

        this.selected = false

        this.intree = false
        this.x = 100
        this.y = 100
        this.wid = 20
        this.hei = 20
    }

    draw(){
        if(this.selected){
            //ctx.fillStyle = "#444444"
            drawCircle(ctx, this.x, this.y, 10, 'black', 'red', 5)
        }else{
            //ctx.fillStyle = "#000000"
            drawCircle(ctx, this.x, this.y, 10, 'black', 'red', 5)
        }

        drawCircle(ctx, this.x, this.y, 10, 'black', 'red', 5)
    }
}






var testnode = new node()


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


    ctx.fillStyle = "#000000"
    ctx.fillRect(10 + 10*seconds, 10, 10, 10)


    testnode.draw()
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
}

init();