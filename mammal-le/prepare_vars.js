



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
var taxa_names = taxa_names_full.split(' ')                             ////
taxa_names_full = undefined
delete(taxa_names_full)

var answer_list_file = loadFile("answer_list_1")
var answer_list = answer_list_file.split('\n')                         ////
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

var dist_matrix = Array(4705*(4706)/2)                                       /////
// The distance matrix is symmetric, so we only store the bottom half,
// in a one dimensional array. D[i][j] = dist_matrix[i*(i + 1)/2 + j]

for(let i = 0; i < 4705; i++){
  let line = matrix[i].split('\t')
  for(let j = 0; j < line.length; j++){
    dist_matrix[i*(i+1)/2 + j] = parseFloat(line[j])
  }
}






var str_js_file = ""


str_js_file += "var taxa_names = ["
for(let i = 0; i < taxa_names.length; i++){
    str_js_file += "'" + taxa_names[i]
    str_js_file += "',"
}
str_js_file += "]\n"


str_js_file += "var answer_list = ["
for(let i = 0; i < answer_list.length; i++){
    str_js_file += "'" + answer_list[i]
    str_js_file += "',"
}
str_js_file += "]\n"


str_js_file += "var dist_matrix = ["
for(let i = 0; i < dist_matrix.length; i++){
    str_js_file += "" + dist_matrix[i].toFixed(4)
    str_js_file += ","
}
str_js_file += "]\n"



console.log(str_js_file)

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }

download("var_include.js", str_js_file) 

console.log('got vars')