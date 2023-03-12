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

var taxa_names = loadFile("tree_data/4705_mammal.taxa");

function get_true_taxa_name(s) {
	var ans = taxa_names.indexOf(s)
	if(ans == -1){
		return ""
	}

	var start = taxa_names.lastIndexOf(" ",ans)
	var end   = taxa_names.indexOf(" ", ans)

	return taxa_names.substring(start+1, end);
}

import PhyloTree from "phylotree"














var ans_name = "ovis_aries"
var guess_1 = "tachyglossus_aculeatus"



console.log(ans_name)
console.log(get_true_taxa_name(ans_name))


var comp1 = get_true_taxa_name(ans_name)
var comp2 = get_true_taxa_name(guess_1)


/*

const { Newick } = require('newick');

const newick = '(((A:0.1,B:0.2):0.3,C:0.4):0.5,D:0.6);'; // example Newick string

const tree = Newick.parse(newick); // or Phylocanvas.Newick.parse(newick);

const tipA = tree.getTips().find(tip => tip.name === 'A');
const tipD = tree.getTips().find(tip => tip.name === 'D');

const pathA = tipA.getPathToRoot();
const pathD = tipD.getPathToRoot();

let lca;

for (let i = 0; i < pathA.length; i++) {
  if (pathD.includes(pathA[i])) {
    lca = pathA[i];
    break;
  }
}

const distA = tipA.getDistanceToNode(lca);
const distD = tipD.getDistanceToNode(lca);
const divergenceTime = distA + distD;

console.log(divergenceTime); // output: 1.5
*/