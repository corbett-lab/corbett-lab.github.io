
function loadFile(filePath) {
  var result = null;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", filePath, false);
  xmlhttp.send();
  if (xmlhttp.status==200) {
    result = xmlhttp.responseText;
  }
  return result;
}

var text = loadFile("questions");

//var fs = require("fs");
//var text = fs.readFileSync("./questions") + "";
var lines = text.split("\n");
var line_count = lines.length;

//removing comments
for(let i = 0; i < line_count; i++){
  var place = lines[i].indexOf("*");
  if(place < 0){
    place = lines[i].length;
  }
  lines[i] = lines[i].substring(0,place);
}

var Questions = [];
var Answers = [];
var Scores = [];

var q = -1;
var a = 0;


for(let i = 0; i < line_count; i++){
  line_array = [...lines[i]];
  if( line_array[0] == '#'){
    Questions.push(lines[i].substring(1,lines[i].length));
    Answers.push(new Array());
    Scores.push(new Array());
    q += 1;
    a = -1;
    Answers[q] = [];
    Scores[q] = [];
  }
  
  if(line_array[0] == ' ' &&
  line_array[1] == ' ' &&
  line_array[2] == ' ' &&
  line_array[3] == ' ' && 
  line_array.length > 4 &&
  (line_array[4] != ' ' ||
  line_array[5] != ' ' ||
  line_array[6] != ' ' ||
  line_array[7] != ' ')){
    Answers[q].push(lines[i].substring(4,lines[i].length));
    Scores[q].push(new Array());
    a += 1;
    Scores[q][a] = [];
  }
  
  if(line_array[0] == ' ' &&
  line_array[1] == ' ' &&
  line_array[2] == ' ' &&
  line_array[3] == ' ' &&
  line_array[4] == ' ' &&
  line_array[5] == ' ' &&
  line_array[6] == ' ' &&
  line_array[7] == ' '){
    Scores[q][a].push(lines[i].substring(8,lines[i].length));
  }

}





function GenerateQuiz(){

  var innards = document.getElementsByClassName("R");
  console.log(innards.length)
  while(innards.length > 0){
    innards[0].remove();
  }

  var element = document.getElementById("quiz");

  for(let i = 0 ; i < Questions.length; i++){

    var tag = document.createElement("p");
    var qtext = document.createTextNode(Questions[i]);
    tag.appendChild(qtext);
    tag.classList.add("Q");
    element.appendChild(tag);

    for(let j = 0; j < Answers[i].length; j++){
      var button = document.createElement("input");
      button.id = "Q".concat(i).concat("A").concat(j);
      button.type = "radio";
      button.name = "Q".concat(i);
      button.classList.add("Q");
      element.appendChild(button);

      var answer_text = document.createElement("label");
      var a_text = document.createTextNode(Answers[i][j]);
      answer_text.appendChild(a_text);
      answer_text.for = button.id;
      answer_text.classList.add("Q");
      element.appendChild(answer_text);

      var brkr = document.createElement("br");
      brkr.classList.add("Q");
      element.appendChild(brkr);
    }
    var brkr = document.createElement("br");
    brkr.classList.add("Q");
    element.appendChild(brkr);
  }

  var submit_button = document.createElement("input");
  submit_button.type = "submit";
  submit_button.value = "Submit";
  submit_button.classList.add("Q");
  element.appendChild(submit_button);
}


//Calculating Result points/////////////////////////////////////////////////

max = [0,0,0,0,0,0]
min = [0,0,0,0,0,0]

for(let i = 0 ; i < Questions.length; i++){
  this_max = [Number.MIN_SAFE_INTEGER,Number.MIN_SAFE_INTEGER,Number.MIN_SAFE_INTEGER,Number.MIN_SAFE_INTEGER,Number.MIN_SAFE_INTEGER,Number.MIN_SAFE_INTEGER];
  this_min = [Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER];
  for(let j = 0; j < Answers[i].length; j++){
    for(let k = 0; k < Scores[i][j].length; k++){
      this_max[k] = Math.max(this_max[k],parseFloat(Scores[i][j][k]));
      this_min[k] = Math.min(this_min[k],parseFloat(Scores[i][j][k]));
    }
  }
  for(let k = 0; k < 6; k++){
      max[k] += this_max[k];
      min[k] += this_min[k];
  }
}


// opening results file
var result_text = loadFile("results");
lines = result_text.split("\n");
line_count = lines.length;

//removing comments
for(let i = 0; i < line_count; i++){
  var place = lines[i].indexOf("*");
  if(place < 0){
    place = lines[i].length;
  }
  lines[i] = lines[i].substring(0,place);
}

var Results = []
var Descriptions = []
var Result_points = []

var r = -1


for(let i = 0; i < line_count; i++){
  line_array = [...lines[i]];
  if( line_array[0] == '#'){
    Results.push(lines[i].substring(1,lines[i].length));
    Result_points.push(new Array());
    r += 1;
    Result_points[r] = [];
  }
  if(line_array[0] == '%'){
    Descriptions.push(lines[i].substring(1,lines[i].length));
  }
  
  if(line_array[0] == ' ' &&
  line_array[1] == ' ' &&
  line_array[2] == ' ' &&
  line_array[3] == ' ' && 
  line_array.length > 4 &&
  (line_array[4] != ' ' ||
  line_array[5] != ' ' ||
  line_array[6] != ' ' ||
  line_array[7] != ' ')){
    Result_points[r].push(parseFloat(lines[i].substring(4,lines[i].length)));
  }
}

/////////////////////////////////////////////////////////////////////////////

function HandleQuiz(form){

  var result_attributes = [0,0,0,0,0,0];

  for(let i = 0; i < Answers.length; i++){
    for(let j = 0; j < Answers[i].length; j++){
      var button = document.getElementById("Q".concat(i).concat("A").concat(j));
      if(button.checked){
        for(let k = 0; k < 6; k++){
          result_attributes[k] += parseFloat(Scores[i][j][k]);
        }
      }
    }
  }

  for(let k = 0; k < 6; k++){
    result_attributes[k] = (result_attributes[k] - min[k])/(max[k] - min[k])
  }

  
  var str = "Compression: " + result_attributes[0] + "\n";
  str=str + "Readibility: " + result_attributes[1] + "\n";
  str=str + "Code:        " + result_attributes[2] + "\n";
  str=str + "Data:        " + result_attributes[3] + "\n";
  str=str + "Goodness:    " + result_attributes[4] + "\n";
  str=str + "Age:         " + result_attributes[5] + "\n";
  
  

  var min_dist = Number.MAX_SAFE_INTEGER;
  var min_index = 0;

  for(let i = 0; i < Results.length; i++){
    var dist = 0;
    for(let k = 0; k < 6; k++){
      dist += (result_attributes[k] - Result_points[i][k]) ** 2 //Euclidean dist
    }
    if(dist < min_dist){
      min_dist = dist
      min_index = i
    }
  }

  console.log("Copy and send this to nico for debugging:\n###\n"+Results[min_index]+"\n"+str+"###")
  
  var quiz_innards = document.getElementsByClassName("Q");
  console.log(quiz_innards.length)
  while(quiz_innards.length > 0){
    quiz_innards[0].remove();
  }

  
  var element = document.getElementById("results");

  var tag = document.createElement("p");
  var qtext = document.createTextNode("Your file type is...");
  tag.appendChild(qtext);
  tag.classList.add("R");
  element.appendChild(tag);

  tag = document.createElement("h1");
  qtext = document.createTextNode(Results[min_index]);
  tag.appendChild(qtext);
  tag.id = "result"
  tag.classList.add("R");
  element.appendChild(tag);

  tag = document.createElement("p");
  qtext = document.createTextNode("\t"+Descriptions[min_index]);
  tag.appendChild(qtext);
  tag.id = "description"
  tag.classList.add("R");
  element.appendChild(tag);
  
  var submit_button = document.createElement("input");
  submit_button.type = "submit";
  submit_button.value = "Retake the test!";
  submit_button.classList.add("R");
  element.appendChild(submit_button);
  
}


GenerateQuiz();