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

var taxa_names_full = loadFile("tree_data/4705_mammal.taxa");
var taxa_names = taxa_names_full.split(' ')
taxa_names_full = undefined
delete(taxa_names_full)

var mat_0 = loadFile("tree_data/4705_mammal_dist_matrix_0-3299")
var mat_1 = loadFile("tree_data/4705_mammal_dist_matrix_3300-4704")
var m_0_lines = mat_0.split('\n')
m_0_lines.pop()
var m_1_lines = mat_1.split('\n')
m_1_lines.pop()
var matrix = m_0_lines.concat(m_1_lines)

mat_0 = undefined
mat_1 = undefined
m_0_lines = undefined
m_1_lines = undefined
delete(mat_0)
delete(mat_1)
delete(m_0_lines)
delete(m_1_lines)

var dist_matrix = Array(4705*(4706)/2)

for(let i = 0; i < 4705; i++){
  let line = matrix[i].split('\t')
  for(let j = 0; j < line.length; j++){
    dist_matrix[i*(i+1)/2 + j] = parseFloat(line[j])
  }
}


function get_index(name) {
  for(let i = 0; i < taxa_names.length; i++){
    if (taxa_names[i].indexOf(name) != -1){
      return i
    }
  }
}

function get_dist(name_0, name_1){
  var taxa_0 = get_index(name_0)
  var taxa_1 = get_index(name_1)

  var min = Math.min(taxa_0,taxa_1)
  var max = Math.max(taxa_0,taxa_1)

  return dist_matrix[max*(max+1)/2+min]
}


var answer = "loxodonta_africana"


console.log(get_dist("tachyglossus_aculeatus","zaglossus_bruijni"))
console.log(get_dist("zaglossus_bruijni","tachyglossus_aculeatus"))
console.log(get_dist("loxodonta_cyclotis","loxodonta_africana"))












var guesses = []
var guess_dists = []






function update_list(){
  var list = document.getElementById("guessList");

  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }


  for(let i = 0; i < guesses.length; i++){
    var item = document.createElement("li");
    item.appendChild(document.createTextNode(guesses[i]));
    list.appendChild(item);
  }
}

function guessString() {
  var input = document.getElementById("guessInput").value;
  
  var dist = get_dist(input, answer)
  guess_dists.push(dist)
  guesses.push(dist + "\t" + input)

  update_list()
}