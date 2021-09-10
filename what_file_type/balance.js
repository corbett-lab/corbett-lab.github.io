
  //var text = loadFile("questions");
  
  var fs = require("fs");
  var text = fs.readFileSync("./questions") + "";
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
  var result_text = fs.readFileSync("./results") + "";

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




var result_distribution = new Array(Results.length)
for(let i = 0; i < result_distribution.length; i++){
    result_distribution[i] = 0;
}


function RandomAnswers(){

    var result_attributes = [0,0,0,0,0,0];

    for(let i = 0; i < Answers.length; i++){

        var choice = Math.floor(Answers[i].length*Math.random())

        for(let k = 0; k < 6; k++){
            result_attributes[k] += parseFloat(Scores[i][choice][k]);
        }
    }
  
    for(let k = 0; k < 6; k++){
      result_attributes[k] = (result_attributes[k] - min[k])/(max[k] - min[k])
    }
    
    
  
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

    result_distribution[min_index] += 1;
}

var Trials = 1000000;

for(let i = 0; i < Trials; i++){
    RandomAnswers();
}

for(let i = 0; i < result_distribution.length; i++){
    console.log(result_distribution[i] + "\t" + Results[i])
}


var ordered_by_att = [];



//Now ordering all attributes
for(let k = 0; k < Result_points[0].length; k++){
  
  for(let j = 0; j < Result_points.length; j++){
      
  }
}
