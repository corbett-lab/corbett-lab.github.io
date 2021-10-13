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

//Trees are stored in All_trees
//children and parents are stored as indexes in all trees
var All_Trees = []



class Node{
    constructor(){
        this.parent = null
        this.children = []

        this.label = ""
        this.image = null

        this.selected = false

        this.intree = false
        this.x = 100
        this.y = 100
        this.width = 20
        this.height = 20
    }

    computewidth(){
        return this.wid
    }
    computeheight(){
        return this.hei
    }

    draw(){
        drawCircle(ctx, this.x, this.y, 5, "#444444", "#AAAAAA", 2)
    }
}



//x and y of tree are top left corner
class Tree{
    constructor(x, y, node){
        this.x = x
        this.y = y
        this.node = node
        this.children = [] //list of indecies in All_trees
        this.parent = null

        //this.widthcomputed = true
        this.width = this.node.width
        //this.heightcomputed = true
        this.height = this.node.height

        //this.positionscomputed = false
    }

    addChild(child){
        child.parent = this
        this.children.push(child);
        this.widthcomputed = false;
        this.heightcomputed = false;
        if(this.parent){
            this.parent.widthcomputed = false
            this.parent.heightcomputed = false;
            this.parent.positionscomputed = false
        }

        this.positionscomputed = false
    }

    computewidth(){
        if(this.widthcomputed){
            return this.width;
        }

        var fattestson = 0
        console.log("fattestson")
        for(let i = 0; i < this.children.length; i++){
            if(this.children[i].computewidth() > fattestson){
                fattestson = this.children[i].computewidth()
            }
            console.log(fattestson + "  " + this.node.x + "  " + this.node.y)
        }

        fattestson += this.node.width;

        fattestson += 20;

        this.width = fattestson
        this.widthcomputed = true;
        return this.width
    }

    computeheight(){
        if(this.heightcomputed){
            return this.height;
        }

        var totalheight = 0

        for(let i = 0; i < this.children.length; i++){
            totalheight += this.children[i].computeheight();
            totalheight += 20;
        }
        totalheight -= 20

        if(totalheight < this.node.height){
            this.height = this.node.height;
            this.heightcomputed = true;
            return this.height
        }

        this.height = totalheight
        this.heightcomputed = true;
        return this.height
    }

    computepositions(){
        if(this.positionscomputed){
            //return
        }

        this.computewidth()
        this.computeheight()
        
        this.node.x = this.x + this.node.width/2;
        this.node.y = this.y + this.height/2

        this.scan = this.y;
        for(let i = 0; i < this.children.length; i++){
            this.children[i].x = this.x + this.node.width + 20;
            this.children[i].y = this.scan;
            this.children[i].computepositions();
            
            this.scan += this.children[i].computeheight();
            this.scan += 20;
        }

        this.positionscomputed = true
    }
    resetpositions(){
        for(let i = 0; i < this.children; i++){
            this.children[i].resetpositions();
        }
        this.positionscomputed = false;
    }
    
    draw(){
        this.computepositions();

        ctx.strokeStyle = "#888888";
        ctx.lineWidth = 2;
        if(this.children.length > 0){
            ctx.beginPath();
            ctx.moveTo(this.node.x, this.children[0].node.y)
            ctx.lineTo(this.node.x, this.children[this.children.length - 1].node.y)
            ctx.stroke();
        }
        for(let i = 0; i < this.children.length; i++){
            ctx.strokeStyle = "#888888";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(this.node.x, this.children[i].node.y)
            ctx.lineTo(this.children[i].node.x, this.children[i].node.y)
            ctx.stroke();

            this.children[i].draw();
        }

        this.node.draw();
    }

    handleclick(){
        if(mouseX >= this.node.x - this.node.width/2 && mouseX <= this.node.x + this.node.width/2 && mouseY >= this.node.y  - this.node.height/2 && mouseY <= this.node.y + this.node.height/2){
            this.addChild(new Tree(100,100,new Node()))
        }
        for(let i = 0; i < this.children.length; i++){
            this.children[i].handleclick();
        }
    }
}

class Root{
    constructor(vertpadding, horizpadding){
        this.vertpadding = vertpadding
        this.horizpadding = horizpadding
    }
}

var testnode = new Node()






var tree = new Tree(100,100,new Node())

var A = new Tree(100,100,new Node())
var B = new Tree(100,100,new Node())
var C = new Tree(100,100,new Node())

A.addChild(new Tree(100,100,new Node()))
A.addChild(new Tree(100,100,new Node()))
A.addChild(new Tree(100,100,new Node()))

B.addChild(new Tree(100,100,new Node()))
B.addChild(new Tree(100,100,new Node()))

C.addChild(A);
C.addChild(B);

tree.addChild(C)
tree.addChild(new Tree(100,100,new Node()))
tree.computepositions()


for(let i = 0; i < 10; i++){
    All_Trees.push(new Tree(100,100,new Node()))
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

    
    
    ctx.fillStyle = "#999999";
    ctx.fillRect(tree.x, tree.y, tree.computewidth(), tree.computeheight());

    
    tree.draw();
    
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
        //tree.resetpositions()
        tree.computepositions()
    }
}

init();