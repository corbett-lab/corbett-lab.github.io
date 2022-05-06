var canvas = 0
var ctx = 0


var width = 0;
var height = 0;

var mouseX = 0;
var mouseY = 0;

var last_frame = Date.now()
var this_frame = Date.now()

var player_names = []
var scores = []






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
    scoreboard.setAttribute("id","scoreboard")

    const scorecard = document.createElement("div")
    scorecard.setAttribute("id","scorecard")

    
    const canv = document.createElement("canvas")
    canv.setAttribute("id","myCanvas")
    canv.style.width = "50%"
    canv.style.height = "100%"

    scorecard.appendChild(canv)

    

    const button = document.createElement("button")
    button.setAttribute("id","completed")
    button.style.width = 100
    button.style.height = 50
    button.setAttribute("onclick","to_results();");
    var button_text = document.createTextNode("Deliberate");
    button.appendChild(button_text);
    

    
    

    
    scoreboard.appendChild(scorecard)
    scoreboard.appendChild(button)
    body.appendChild(scoreboard)
    

    init();
}

function to_results(){

    scoreboard = document.getElementById("scoreboard")
    body = scoreboard.parentNode

    body.removeChild(scoreboard);

    const result_title = document.createElement("h1")
    var result_text = document.createTextNode("Results");
    result_title.appendChild(result_text)

    body.appendChild(result_title)
    
    for(let i = 0; i < players; i++){
        const player_result = document.createElement("p")
        var text = player_names[i] + ": "+String(scores[i])+", "
        if(scores[i] < 18){
            text += "God"
        }else if (scores[i] <= 35){
            text += "Course Capitan"
        }else if (scores[i] <= 39){
            text += "First Mate Tour Pro"
        }else if (scores[i] <= 40){
            text += "Trusty Shipmate"
        }else if (scores[i] <= 45){
            text += "Amateur Deckhand"
        }else if (scores[i] <= 50){
            text += "Cabin Boy Caddy"
        }else if (scores[i] <= 55){
            text += "Walk the plank over lukewarm water"
        }else if (scores[i] <= 60){
            text += "Walk the plank over some pretty cold water"
        }else if (scores[i] <= 65){
            text += "Walk the plank over shark infested water"
        }else if (scores[i] <= 70){
            text += "Condemned to the gallows"
        }else if (scores[i] <= 80){
            text += "Cannon to the chest"
        }else if (scores[i] <= 90){
            text += "Captain Parrot"
        }else if (scores[i] <= 100){
            text += "Lieutenant Parrot"
        }else{
            text += "Minor footsoldier Parrot"
        }
        var player_text = document.createTextNode(text);
        player_result.appendChild(player_text)
        body.appendChild(player_result)
    }
    

    /*
    let xhr = new XMLHttpRequest();
    //this works: "https://reqbin.com/echo/post/json"
    xhr.open("POST", "https://0a3c-128-114-198-5.ngrok.io/yuh");

    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = () => console.log(xhr.responseText);

    let data = `{
    "Id": 78912,
    "Customer": "Jason Sweet",
    }`;

    xhr.send(data);
    */

    
    fetch("http://e11c-128-114-198-5.ngrok.io/yuh",{
        headers: {
            Accept: "application/json"
        },
        method: "POST",
        body: JSON.stringify({"help": "get me in"})
    })
    .then(x => {
			console.log("Request complete! response:", x);
	});
    

    console.log("hello?")
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


var bf1 = new Image;
bf1.onload = function() {
    how_many_loaded += 1
}
bf1.src = "images/card/bf1.png"

var bm1 = new Image;
bm1.onload = function() {
    how_many_loaded += 1
}
bm1.src = "images/card/bm1.png"

var ttf1 = new Image;
ttf1.onload = function() {
    how_many_loaded += 1
}
ttf1.src = "images/card/ttf1.png"

var ttm1 = new Image;
ttm1.onload = function() {
    how_many_loaded += 1
}
ttm1.src = "images/card/ttm1.png"





var show_sprite_for = 0
var sprites = []
var sprite_index = 0;


var spr1 = new Image;
spr1.onload = function() {
}
spr1.src = "images/sprites/pirate_parrot_on_computer_hg_wht.webp"

sprites.push(spr1)

function show_sprite(){
    show_sprite_for = 2;
    sprite_index = 0;
}


var startx = 0
var starty = 0
var players = 3

//f 18
var f1width = 86
var theight = 50
var m1width = 68

var bwidth = 3





//Initialize the scorecard scene
function init() {

    console.log("HELLO")

    canvas = document.getElementById("myCanvas");
    canvas.addEventListener("mousedown", doMouseDown, false);
    ctx = canvas.getContext("2d");
    canvas.style.width = (18*2 + m1width*(players+1)*2 + bwidth).toString()+'px';
    canvas.style.height='500px';

    canvas.width = canvas.getBoundingClientRect().width
    canvas.height = canvas.getBoundingClientRect().height

    width = canvas.width;
    height = canvas.height;


    last_frame = Date.now()
    this_frame = Date.now()
    
    const scorecard = document.getElementById("scorecard");

    starty += 11

    //Name text input
    for(let i = 0; i < players + 1; i++){
        
        
        const nameleft = document.createElement("textarea");
        nameleft.setAttribute("class","name")
        nameleft.id = "nl"+i.toString()
        nameleft.style.cssText = "top:"+(starty + 5).toString()+"px;left:"+(startx + 21 + 68*i).toString()+"px"
        nameleft.addEventListener("change", update_names);

        if(i == 0){
            nameleft.value = "Par"
            nameleft.style.fontWeight = "bold"
            nameleft.style.textAlign = "center"
            nameleft.readOnly = true
        }
        scorecard.appendChild(nameleft);

        const nameright = document.createElement("textarea");
        nameright.setAttribute("class","name")
        nameright.id = "nr"+i.toString()
        nameright.style.cssText = "top:"+(starty + 5).toString()+"px;left:"+(startx + 21 + 68*(players+1) + bwidth + 68*i).toString()+"px"
        nameright.addEventListener("change", update_names);

        if(i == 0){
            nameright.value = "Par"
            nameright.style.fontWeight = "bold"
            nameright.style.textAlign = "center"
            nameright.readOnly = true
        }
        scorecard.appendChild(nameright);
    }

    pars = [2,2,2,3,2,2,3,2,2, 2,2,2,3,2,2,3,2,2]

    for(let i = 0; i < 9; i++){
        for(let j = 0; j < players + 1; j++){
            const scoreleft = document.createElement("textarea")
            scoreleft.setAttribute("class","enter")
            scoreleft.id = "s"+i.toString()+"p"+j.toString()
            scoreleft.style.cssText = "top:"+(starty + theight + 47*i).toString()+"px;left:"+(startx + 21 + 68*j).toString()+"px"
            scoreleft.addEventListener("change", calculate_total);

            if(j == 0){
                scoreleft.value = pars[i];
                scoreleft.readOnly = true
            }
            
            scorecard.appendChild(scoreleft);

            const scoreright = document.createElement("textarea")
            scoreright.setAttribute("class","enter")
            scoreright.id = "s"+(9+i).toString()+"p"+j.toString()
            scoreright.style.cssText = "top:"+(starty + theight + 47*i).toString()+"px;left:"+(startx + 21 + 68*(players+1) + bwidth + 68*j).toString()+"px"
            scoreright.addEventListener("change", calculate_total);
            
            if(j == 0){
                scoreright.value = pars[i];
                scoreright.readOnly = true
            }

            scorecard.appendChild(scoreright);
        }
    }
    
    starty -= 11


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

    player_names = Array(players)
    for(let i = 0; i < players; i++){
        var name = document.getElementById("nl"+String(i))
        player_names[i] = name.value
    }

    console.log(sister_id)
    console.log(player_names)
}

player_totals = []

function calculate_total(){

    show_sprite()

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

    scores = ans;
    return ans;
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

    if(how_many_loaded == 15){
        thisstart = startx

        ctx.drawImage(ttf1, thisstart,starty);
        for(let i = 0; i < players*2; i++){
            ctx.drawImage(ttm1, thisstart + f1width + i*m1width, starty)
        }
        

        starty += 11

        players += 1

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



        players -= 1
        

        starty -= 11
    }

    
    show_sprite_for -= sec;
    if(show_sprite_for > 0){
        ctx.drawImage(sprites[sprite_index], 0,0);
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

