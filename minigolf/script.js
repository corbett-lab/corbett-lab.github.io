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
    if(players < 1){
        alert("Somebody's gotta play")
        return
    }
    if(players > 100){
        alert("Too many players")
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
        var text = player_names[i+1] + ": "+String(scores[i])+", "
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
            text += "Captain Parrot"
        }else if (scores[i] <= 60){
            text += "Lieutenant Parrot"
        }else if (scores[i] <= 65){
            text += "Minor footsoldier Parrot"
        }else if (scores[i] <= 70){
            text += "Walk the plank over lukewarm water"
        }else if (scores[i] <= 80){
            text += "Walk the plank over some pretty cold water"
        }else if (scores[i] <= 90){
            text += "Walk the plank over shark infested water"
        }else if (scores[i] <= 100){
            text += "Condemned to the gallows"
        }else{
            text += "Cannon to the chest"
        }
        var player_text = document.createTextNode(text);
        player_result.appendChild(player_text)
        body.appendChild(player_result)
    }
    

    var names_string = player_names.toString();
    var score_string = scores.toString();
    console.log(names_string)
    console.log(score_string)

    //Do not use this on a school network
    fetch("http://7480-169-233-163-221.ngrok.io/yuh",{
        headers: {
            Accept: "application/json",
            origin: "https://corbett-lab.github.io/"
        },
        method: "POST",
        body: JSON.stringify({
            "names": names_string,
            "scores": score_string
        })
    })
    .then(x => {
			console.log("Request complete! response:", x);
	});
    
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
var gif_id = "Ace1"
var text_id = "AceText"


function show_sprite(player, hole, par){
    gif = document.getElementById(gif_id);
    gif.style.display="none"

    text = document.getElementById(text_id);
    text.style.display="none"


    show_sprite_for = 3;

    score = all_scores[player][hole]

    if(score == 1){
        type = "Ace"
        text_id = type + "Text"

        gif_ind = Math.floor(Math.random() * 3) + 1

        gif_id = type + String(gif_ind)
    }else if(score == par - 1){
        type = "Birdie"
        text_id = type + "Text"

        gif_ind = Math.floor(Math.random() * 4) + 1

        gif_id = type + String(gif_ind)
    }else if(score == par){
        type = "Par"
        text_id = type + "Text"

        gif_ind = Math.floor(Math.random() * 4) + 1

        gif_id = type + String(gif_ind)
    }else if(score == par + 1){
        type = "Bogey"
        text_id = type + "Text"

        gif_ind = Math.floor(Math.random() * 3) + 1

        gif_id = type + String(gif_ind)
    }else if(score == par + 2){
        type = "Double_Bogey"
        text_id = type + "Text"

        gif_ind = Math.floor(Math.random() * 3) + 1

        gif_id = type + String(gif_ind)
    }else{
        type = "Beyond_Double_Bogey"
        text_id = type + "Text"

        gif_ind = Math.floor(Math.random() * 2) + 1

        gif_id = type + String(gif_ind)
    }
    




    animation = Math.floor(Math.random() * 5) + 1
    animation = "flier" + String(animation)

    gif = document.getElementById(gif_id);
    gif.style.display=""
    gif.className = animation
    text = document.getElementById(text_id);
    text.style.display=""
    text.className = animation
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
            scoreleft.addEventListener("change", () => {calculate_total(); show_sprite(j - 1, i, pars[i])});

            if(j == 0){
                scoreleft.value = pars[i];
                scoreleft.readOnly = true
            }
            
            scorecard.appendChild(scoreleft);

            const scoreright = document.createElement("textarea")
            scoreright.setAttribute("class","enter")
            scoreright.id = "s"+(9+i).toString()+"p"+j.toString()
            scoreright.style.cssText = "top:"+(starty + theight + 47*i).toString()+"px;left:"+(startx + 21 + 68*(players+1) + bwidth + 68*j).toString()+"px"
            scoreright.addEventListener("change", () => {calculate_total(); show_sprite(j - 1, i+9, pars[i+9])});
            
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
    for(let i = 1; i < players + 1; i++){
        var name = document.getElementById("nl"+String(i))
        player_names[i] = name.value
    }

    console.log(sister_id)
    console.log(player_names)
}

player_totals = []
all_scores = []

function calculate_total(){

    id_array = ["s","0","p","0"]
    ans = []

    all_scores = []

    for(let p = 0; p < players; p++){

        total = 0

        all_scores.push([])

        for(let i = 0; i < 18; i++){
            id_array[1] = i.toString()
            id_array[3] = (p+1).toString()

            id = id_array.join("")

            
            score = parseInt(document.getElementById(id).value)
            if(isNaN(score)){
                score = 0
                document.getElementById(id).value = "";
            }

            all_scores[p].push(score)
            total += score
        }

        ans.push(total)
    }

    console.log("HAHAHA")
    console.log(all_scores)

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
    if(show_sprite_for < 0){
        gif = document.getElementById(gif_id);
        gif.style.display="none"

        text = document.getElementById(text_id);
        text.style.display="none"
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

