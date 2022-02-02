var canvas = document.getElementById("myCanvas");
canvas.addEventListener("mousedown", doMouseDown, false);
var ctx = canvas.getContext("2d");

canvas.width = canvas.getBoundingClientRect().width
canvas.height = canvas.getBoundingClientRect().height
var width = canvas.width;
var height = canvas.height;

function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;

    var copy = new obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function init() {
    window.requestAnimationFrame(draw);
}

let seedsx = [];
let seedsy = [];

seedsx.push(30);
seedsy.push(40);

var running = true;

var last_frame = Date.now()
var this_frame = Date.now()

class branch{
    constructor(x, y, width, height, width_decay, height_decay, direction, color, branches, angles, end, spawn){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.prog = 0;

        this.width_decay = width_decay;
        this.height_decay = height_decay;
        this.direction = direction;
        this.color = color;
        this.angles = angles;
        this.b_count = branches;
        this.sprouted = false;

        this.end = end;
        this.spawn = spawn;
        this.terminated = false;
    }

    draw(){
        ctx.lineWidth = this.width/2;
        ctx.fillStyle = "#200000";
        ctx.strokeStyle = this.color;
        
        ctx.beginPath();
        ctx.moveTo(this.x + Math.cos(this.direction + Math.PI/2) * this.width/4, this.y + Math.sin(this.direction + Math.PI/2) * this.width/4);
        ctx.lineTo(this.x + Math.cos(this.direction)*this.height*this.prog, this.y + Math.sin(this.direction)*this.height*this.prog);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(this.x + Math.cos(this.direction - Math.PI/2) * this.width/4, this.y + Math.sin(this.direction - Math.PI/2) * this.width/4);
        ctx.lineTo(this.x + Math.cos(this.direction)*this.height*this.prog, this.y + Math.sin(this.direction)*this.height*this.prog);
        ctx.stroke();

        if(this.sprouted){
            for(let i = 0; i < this.branches.length;i++)
                this.branches[i].draw();
        }
        if(this.terminated && this.spawn){
            this.spawn.draw();
        }
    }

    tick(sec){

        if(this.end == 0){

            if(!this.terminated){
                this.terminated = true;
                if(this.spawn){
                    this.spawn.x = this.x;
                    this.spawn.y = this.y;
                    this.spawn.direction = this.direction;
                }
            }

            if(this.terminated && this.spawn){
                this.spawn.tick(sec);
            }

        }else{

            if(this.prog < 1){

                this.prog += sec;

            }else if(!this.sprouted){

                if(this.end != 0){
                    //sprouting
                    this.sprouted = true;
                    this.branches = [];
                    for(let i = 0; i < this.b_count; i++){
                        var b = new branch(
                            this.x + Math.cos(this.direction)*this.height,
                            this.y + Math.sin(this.direction)*this.height,
                            this.width * this.width_decay,
                            this.height * this.width_decay,
                            this.width_decay,
                            this.height_decay,
                            this.direction+this.angles[i],
                            this.color,
                            this.b_count,
                            this.angles,
                            this.end - 1,
                            clone(this.spawn)
                        )
                        this.branches.push(b);
                    }
                }else{
                    if(!this.terminated){
                        this.terminated = true;
                        if(this.spawn){
                            this.spawn.x = this.x + Math.cos(this.direction)*this.height;
                            this.spawn.y = this.y + Math.sin(this.direction)*this.height;
                            this.spawn.direction = this.direction;
                        }
                    }
                    if(this.terminated && this.spawn){
                        this.spawn.tick(sec);
                    }
                }
            
            }else{
                for(let i =0; i < this.branches.length; i++){
                    this.branches[i].tick(sec);
                }
            }
        }
    }
}















//for some reason i need this
var man = new branch(3000,30,0.5,0,1,-1,"#400000");

var trees = [];


function draw() {
    canvas.width = canvas.getBoundingClientRect().width
    canvas.height = canvas.getBoundingClientRect().height
    width = canvas.width;
    height = canvas.height;

    last_frame = this_frame
    this_frame = Date.now()
    var sec = (this_frame - last_frame) / 1000.0

    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, width, height);

    for(let i = 0; i < seedsx.length; i++){
        ctx.fillStyle = "#772222";
        ctx.fillRect(seedsx[i], seedsy[i], 2,1);
    }
    for(let i = 0; i < seedsx.length; i++){
        seedsy[i] += sec * 60

        if(seedsy[i] > height){
            var big = Math.random() < 0.2;
            var girth = 0;
            if(big)
                girth = Math.random()*40;
            else
                girth = Math.random()*10;

            var branches = 2 + Math.floor(Math.pow(Math.random(), 2) * 3);
            if(big && branches < 4)
                branches +=1;
            var angles = []
            for(let j =0; j < branches; j++){
                angles[j] = (Math.random()-0.5)*Math.PI;
            }

            var leaf_b = 2;
            var leaf_angles = [];
            for(let j =0 ; j < leaf_b; j++){
                leaf_angles[j] = Math.random()*2*Math.PI;
            }

            var leafs = Math.floor(Math.pow(Math.random(), 2) * 4);
            
            var leaf = new branch(
                0,
                0,
                girth/3,
                girth,
                0.5,
                0.5,
                0,
                "#309010",
                leaf_b, 
                leaf_angles,
                leafs,
                null
            )

            var tree = new branch(
                seedsx[i],
                height,
                girth + Math.random()*2,
                girth*5+ Math.random()*5,
                0.5,
                0.5,
                -Math.PI/2 +(Math.random()-0.5)*Math.PI*0.1,
                "#400000",
                branches,
                angles,
                4,
                leaf)
            trees.push(tree)
            seedsy.splice(i, 1)
            seedsx.splice(i, 1)
        }
    }
    

    for(let i = 0; i < trees.length; i++){
        trees[i].tick(sec);
        trees[i].draw();
    }
    man.tick(sec);
    man.draw();
    window.requestAnimationFrame(draw);
}


function doMouseDown(e){
    var mouseX = 0;
    var mouseY = 0;

    if(e.offsetX) {
        mouseX = e.offsetX;
        mouseY = e.offsetY;
    }
    else if(e.layerX) {
        mouseX = e.layerX;
        mouseY = e.layerY;
    }
    seedsx.push(mouseX);
    seedsy.push(mouseY);
}

init();
