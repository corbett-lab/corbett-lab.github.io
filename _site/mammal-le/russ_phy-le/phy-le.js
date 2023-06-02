// input data definitions
//const taxa = ["Homo_sapiens","Pan_troglodytes","Gorilla_gorilla","Canis_lupus","Felis_catus","Equus_caballus","Bos_taurus"] ;
//const newickTree = "(((Homo_sapiens:0.005,Pan_troglodytes:0.01):0.02,Gorilla_gorilla:0.03):0.04,((Canis_lupus:0.015,Felis_catus:0.02):0.05,(Equus_caballus:0.02,Bos_taurus:0.03):0.06):0.02);"
const newickTree = "((((((((human:0.01, chimpanzee:0.01):0.02, gorilla:0.03):0.01, orangutan:0.04):0.03, gibbon:0.07):0.1, (macaque:0.08, baboon:0.1):0.1):0.1, (((rat:0.2, mouse:0.2):0.15, (dog:0.05, cat:0.06):0.3):0.2):0.2, ((horse:0.3, cow:0.35):0.3):0.2, (elephant:0.6, (whale:0.6, dolphin:0.65):0.2):0.2):0.5):0.2, platypus:1.2):1, chicken:2);" ;
​
/// lets define an input script that includes a tree, with designated outgroup and (if applicable) metadata such as common names, etc. 
​
/// 
function tweet() {
  var text = "Check out PHY-LE!"; // Add your own text here
  var url = encodeURIComponent("https://www.PHY-LE.com"); // Add your website URL here
  var tweetUrl = "https://twitter.com/intent/tweet?text=" + text + "&url=" + url;
  window.open(tweetUrl);
}
​
/// get taxa ids
var jsonTree = parse( newickTree );
function getNodeIds(tree) {
  let ids = [];
  
  // get all node ids using recursion
  function traverse(node) {
    if (node.children) {
      for (let child of node.children) {
        traverse(child);
      }
    }
    if ( node.name != "" ) { 
      ids.push(node.name);
    }
  }
  
  traverse(tree);
  return ids;
}
var taxa = getNodeIds( jsonTree ) ; 
​
/// randomly select a taxon from the list
function replaceRandomElement ( array ) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex] ;
}
​
/// set target here
var target = replaceRandomElement( taxa ) ; 
​
/// then replace the target in the tree
var newick = newickTree.replace( target, "Target");
console.log(newick) ; 
​
/// store as a useful tree object
/// should just make a list of node ids for taxa here
jsonTree = parse( newick );
​
/// then put target into the existing guess list
var guesses = ["Target"] ; 
​
/// parsing function to create useful representation of newick
function parse(newick) {
    let nextid = 0;
    const regex = /([^:;,()\s]*)(?:\s*:\s*([\d.]+)\s*)?([,);])|(\S)/g;
    newick += ";"
    
    return (function recurse(parentid = -1) {
        const children = [];
        let name, length, delim, ch, all, id = nextid++;;
​
        [all, name, length, delim, ch] = regex.exec(newick);
        if (ch == "(") {
            while ("(,".includes(ch)) {
                [node, ch] = recurse(id);
                children.push(node);
            }
            [all, name, length, delim, ch] = regex.exec(newick);
        }
        return [{id, name, length: +length, parentid, children}, delim];
    })()[0];
}
​
/// this will filter a tree to retain only tips in the list and their parents
function filter(tree, list) {
    let filteredChildren = [];
  
    // there is a bug somewhere aorund here that causes branch lenghts to be too short.
    // suspect it's about how we merge when pruning.  
    for (let child of tree.children) {
      if (list.includes(child.name)) {
        child.children = filter(child, list).children;
        filteredChildren.push(child);
      } else {
        let filteredChild = filter(child, list);
        if (filteredChild.children.length > 0) {
          filteredChild.children = filter(filteredChild, list).children;
          filteredChildren.push(filteredChild);
        } else {
          filteredChildren = filteredChildren.concat(filter(filteredChild, list).children);
        }
      }
    }
  
    tree.children = filteredChildren;
    return tree;
}
​
function toNewick(tree) {
    let newick = "";
  
    if (tree.children.length > 0) {
      if (tree.children.length === 1) {
        // Combine successive branches with a single child
        let child = tree.children[0];
  
        while (child.children.length === 1) {
          child = child.children[0];
          tree.length = (tree.length || 0) + (child.length || 0);
        }
  
        newick += toNewick(child);
        tree.length = (tree.length || 0) + (child.length || 0);
        child.length = undefined;
      } else {
        newick += "(";
  
        for (let i = 0; i < tree.children.length; i++) {
          newick += toNewick(tree.children[i]);
  
          if (i < tree.children.length - 1) {
            newick += ",";
          }
        }
  
        newick += ")";
      }
    }
  
    if (tree.name !== undefined) {
      newick += tree.name;
  
      if (tree.length !== undefined) {
        if (tree.children.length > 0) {
          if (tree.length !== 0) {
            newick += ":" + tree.length;
          }
        } else {
          let parts = tree.length.toString().split(":");
          if (parts.length > 1) {
            let sum = 0;
            for (let i = 0; i < parts.length; i++) {
              sum += parseFloat(parts[i]);
            }
            newick += ":" + "(" + sum + ")";
          } else {
            newick += ":" + tree.length;
          }
        }
      }
    }
  
    // Replace branch lengths formatted as ":X:Y" with their sum
    newick = newick.replace(/:\d+(\.\d+)?:\d+(\.\d+)?/g, function(match) {
      let parts = match.slice(1).split(":");
      let sum = 0;
      for (let i = 0; i < parts.length; i++) {
        sum += parseFloat(parts[i]);
      }
      return ":" + sum ;
    });
  
    return newick ;
}  
​
/// main interactive elements 
$("#taxonInput").autocomplete({
    source: taxa
  });
​
  // add click listener to the "Add taxon" button
  $("#addItemButton").click(function() {
    // get the value of the item input field
    var selectedTaxon = $("#taxonInput").val();
​
    // add the selected item to the selected items list we display and to one we are keeping
    if (selectedTaxon !== "") {
​
      // should be some kind of real celebration
      if ( selectedTaxon == target ) {
          $("#GotIt").append("You Got It: " + selectedTaxon + "!");
      }
​
      $("#selectedItemsList").append("<li>" + selectedTaxon + "</li>");
      guesses.push(selectedTaxon) ; 
​
      /// prune the list of selected taxa from the newick
      /// probably could do this only once as long as we deep copy the tree object
      const parsedTree = structuredClone( jsonTree ) ; 
      var prunedTree = filter(parsedTree, guesses); 
      var prunedNewick = toNewick( prunedTree ) + ";" ; 
​
      // clear the previous tree
      document.getElementById("tree_display").innerHTML = "" ;
​
      /// now render this. 
      const tree = new phylocanvas.PhylocanvasGL(
        document.querySelector("#tree_display"),
        {
            size: { width: 900 , height: 450 },
            showLabels: true,
            showLeafLabels: true,
            source: prunedNewick ,
            interactive: true,
        },
        [
            phylocanvas.plugins.scalebar,
        ],
      );
​
    }
​
    // clear the item input field
    $("#itemInput").val("");
​
});