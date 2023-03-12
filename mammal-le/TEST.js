

// Read in the Newick tree
var treeString = "(A,(B,C));"; // Replace with your own Newick tree string
var newick = new Newick();
var tree = newick.parse(treeString);

// Draw the tree using phylotree.js
var svg = d3.select("#tree").append("svg")
  .attr("width", 500)
  .attr("height", 500);

