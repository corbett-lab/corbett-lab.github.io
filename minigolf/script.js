

var canvas = 0
var ctx = 0


var width = 0;
var height = 0;

var mouseX = 0;
var mouseY = 0;

var last_frame = Date.now()
var this_frame = Date.now()




function to_scorecard(){
    console.log("To scorecard")

    players = parseInt(document.getElementById("playersinput").value)

    if(isNaN(players)){
        alert("Enter a number buddy")
        return
    }
    
    titlepage = document.getElementById("titlepage")
    body = titlepage.parentNode

    body.removeChild(titlepage);

    const scoreboard = document.createElement("div")
    scoreboard.setAttribute("id","scorecard")

    
    const canv = document.createElement("canvas")
    canv.setAttribute("id","myCanvas")
    canv.style.width = "50%"
    canv.style.height = "100%"

    scoreboard.appendChild(canv)

    body.appendChild(scoreboard)


    init();
}







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




var startx = 0
var starty = 0
var players = 3

//f 18
var f1width = 86
var theight = 50
var m1width = 68

var bwidth = 3






function init() {

    console.log("HELLO")

    canvas = document.getElementById("myCanvas");
    canvas.addEventListener("mousedown", doMouseDown, false);
    ctx = canvas.getContext("2d");
    canvas.style.width = (18*2 + m1width*players*2 + bwidth).toString()+'px';
    canvas.style.height='500px';

    canvas.width = canvas.getBoundingClientRect().width
    canvas.height = canvas.getBoundingClientRect().height

    width = canvas.width;
    height = canvas.height;


    last_frame = Date.now()
    this_frame = Date.now()
    
    const scorecard = document.getElementById("scorecard");

    for(let i = 0; i < players; i++){
        
        const nameleft = document.createElement("textarea");
        nameleft.setAttribute("class","name")
        nameleft.id = "nl"+i.toString()
        nameleft.style.cssText = "top:"+(starty + 5).toString()+"px;left:"+(startx + 21 + 68*i).toString()+"px"
        nameleft.addEventListener("change", update_names);
        
        scorecard.appendChild(nameleft);

        const nameright = document.createElement("textarea");
        nameright.setAttribute("class","name")
        nameright.id = "nr"+i.toString()
        nameright.style.cssText = "top:"+(starty + 5).toString()+"px;left:"+(startx + 21 + 68*players + bwidth + 68*i).toString()+"px"
        nameright.addEventListener("change", update_names);

        scorecard.appendChild(nameright);
    }

    for(let i = 0; i < 9; i++){
        for(let j = 0; j < players; j++){
            const scoreleft = document.createElement("textarea")
            scoreleft.setAttribute("class","enter")
            scoreleft.id = "s"+i.toString()+"p"+j.toString()
            scoreleft.style.cssText = "top:"+(starty + theight + 47*i).toString()+"px;left:"+(startx + 21 + 68*j).toString()+"px"
            scoreleft.addEventListener("change", calculate_total);
            
            scorecard.appendChild(scoreleft);

            const scoreright = document.createElement("textarea")
            scoreright.setAttribute("class","enter")
            scoreright.id = "s"+(9+i).toString()+"p"+j.toString()
            scoreright.style.cssText = "top:"+(starty + theight + 47*i).toString()+"px;left:"+(startx + 21 + 68*players + bwidth + 68*j).toString()+"px"
            scoreright.addEventListener("change", calculate_total);
            
            scorecard.appendChild(scoreright);
        }
    }
    
    

    window.requestAnimationFrame(draw);
}





function update_names(evt){
    console.log(evt.currentTarget.id)
    sister_id = evt.currentTarget.id.split("")
    

    if(sister_id[1] == 'l'){
        sister_id[1] = 'r'
    }else{
        sister_id[1] = 'l'
    }

    sister_id = sister_id.join("")

    const sister_box = document.getElementById(sister_id);
    sister_box.value = evt.currentTarget.value
    console.log(sister_id)
}

player_totals = []

function calculate_total(){

    id_array = ["s","0","p","0"]
    ans = []

    for(let p = 0; p < players; p++){

        total = 0

        for(let i = 0; i < 18; i++){
            id_array[1] = i.toString()
            id_array[3] = p.toString()

            id = id_array.join("")

            total += parseInt(document.getElementById(id).value)
        }

        ans.push(total)
    }

    console.log(ans)
}



var seconds = 0;

function draw() {
    //canvas.width = canvas.getBoundingClientRect().width
    //canvas.height = canvas.getBoundingClientRect().height
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
            thisx = thisstart + f1width
            thisp = (players - 1)
            finalx = thisx
            for(let i = 0; i < Math.floor(thisp/2); i++){
                ctx.drawImage(sm2, thisx + m1width*i*2,starty + theight);
                finalx += m1width*2
            }
            if(thisp%2 == 1){
                ctx.drawImage(sm1, finalx,starty + theight);
            }
        }

        thisstart += f1width + m1width*(players-1)
        

        ctx.drawImage(b, thisstart,starty);

        thisstart += bwidth
        
        
        thisx = thisstart
        thisp = players
        finalx = thisx
        for(let i = 0; i < Math.floor(thisp/2); i++){
            ctx.drawImage(tm2, thisx + m1width*i*2,starty);
            finalx += m1width*2
        }
        if(thisp%2 == 1){
            ctx.drawImage(tm1, finalx,starty);
        }

        
        
        
        thisx = thisstart
        thisp = players
        finalx = thisx
        
        for(let i = 0; i < Math.floor(thisp/2); i++){
            ctx.drawImage(sm2, thisx + m1width*i*2,starty + theight);
            finalx += m1width*2
        }
        if(thisp%2 == 1){
            ctx.drawImage(sm1, finalx,starty + theight);
        }

        thisstart += m1width*players

        ctx.drawImage(te, thisstart,starty);
        ctx.drawImage(se, thisstart,starty + theight);
        
        
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

}

init();