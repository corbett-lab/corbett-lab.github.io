//var taxa_names = loadFile("tree_data/4705_mammal.taxa");
import * as phylotree from "phylotree"

console.log("WE won")

function get_true_taxa_name(s) {
	var ans = taxa_names.indexOf(s)
	if(ans == -1){
		return ""
	}

	var start = taxa_names.lastIndexOf(" ",ans)
	var end   = taxa_names.indexOf(" ", ans)

	return taxa_names.substring(start+1, end);
}















var ans_name = "ovis_aries"
var guess_1 = "tachyglossus_aculeatus"



console.log(ans_name)
console.log(get_true_taxa_name(ans_name))


var comp1 = get_true_taxa_name(ans_name)
var comp2 = get_true_taxa_name(guess_1)