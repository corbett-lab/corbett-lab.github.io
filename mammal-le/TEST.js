



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

var answer_list_file = loadFile("answer_list_1")
var answer_list = answer_list_file.split('\n')
answer_list_file = undefined
delete(answer_list_file)

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
// The distance matrix is symmetric, so we only store the bottom half,
// in a one dimensional array. D[i][j] = dist_matrix[i*(i + 1)/2 + j]

for(let i = 0; i < 4705; i++){
  let line = matrix[i].split('\t')
  for(let j = 0; j < line.length; j++){
    dist_matrix[i*(i+1)/2 + j] = parseFloat(line[j])
  }
}


function get_index_from_latin_name(name) {
  for(let i = 0; i < taxa_names.length; i++) {
    if (taxa_names[i].toUpperCase().indexOf(name.toUpperCase()) != -1){
      return i
    }
  }
  return -1
}

function get_index_from_common_name(name) {
  for(let i = 0; i < answer_list.length; i++) {
    if (answer_list[i].toUpperCase().indexOf(name.toUpperCase()) != -1){
      let t = answer_list[i].split(' ')
      return [get_index_from_latin_name(t[t.length-1]) , answer_list[i]]
    }
  }
  return [-1,""]
}


function get_dist(index_1, index_2){

  var min = Math.min(index_1,index_2)
  var max = Math.max(index_1,index_2)

  return dist_matrix[max*(max+1)/2+min]
}


var answer = get_index_from_latin_name("loxodonta_africana")


var common_name_answer_index = Math.floor(Math.random() * answer_list.length)
let t = answer_list[common_name_answer_index].split(' ')

answer = get_index_from_latin_name(t.pop())














var guesses = []
var guess_taxa = []
var guess_dists = []


const zip = (a, b) => a.map((k, i) => [k, b[i]]);
const fst = (a, b) => a.map((k, i) => [k, b[i]]);



function update_list(){

  var data = zip(guesses, guess_dists)
  data.sort((a,b) => (a[1] - b[1]))



  //updating html list
  var list = document.getElementById("guessList");

  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
  for(let i = 0; i < guesses.length; i++){
    var item = document.createElement("li");
    item.appendChild(document.createTextNode(data[i][0] + "\t" + data[i][1]));
    list.appendChild(item);
  }
}

function guessString() {
  var input = document.getElementById("guessInput").value;
  var guess_name = ""

  var common_name_index = get_index_from_common_name(input)

  
  var guess_index = common_name_index[0]


  if(guess_index == -1){
    guess_index = get_index_from_latin_name(input)
    if(guess_index == -1) {
      return
    }
    guess_name = taxa_names[guess_index]
  }else{
    guess_name = common_name_index[1]
  }
  
  
  
  
  var dist = get_dist(answer, guess_index)
  dist = Math.round(dist * 100) / 100
  

  guess_dists.push(dist)
  guess_taxa.push(taxa_names[guess_index])
  console.log(guess_taxa)
  guesses.push(guess_name)

  update_list()
}