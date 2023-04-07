

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


// Select random one
var common_name_answer_index = Math.floor(Math.random() * answer_list.length)
let t = answer_list[common_name_answer_index].split(' ')

var answer = get_index_from_latin_name(t.pop())










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






