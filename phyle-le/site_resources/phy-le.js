
/// good hints 
/// insulting when you guess species not in the tree
/// rotate tree by shuffling child array at each node
/// can we also arrange the tree so that the target is always on the top?
  //// yes, this is an easy algorithm
  //// find the full path from root to target, 
  //// then, sort each child array so the path is first

/// it should color the last guess differently as well. 


// turn off the rhino and nico at the beginning
var rhinoDiv = document.getElementById("rhino") ; 
rhinoDiv.style.display = "none" ;
var nicoDiv = document.getElementById("nico") ; 
nicoDiv.style.display = "none" ;

/// turn off input initally 
let inputDiv = document.getElementById("taxonInput") ; 
inputDiv.style.display = "none" ;
let itemDiv = document.getElementById("addItemButton") ; 
itemDiv.style.display = "none" ;
let lucky = document.getElementById("imlucky") ; 
lucky.style.display = "none" ;

/// 
var guess_total ; 

main() ; 

/// function to set the tree via the tree selector
function setTree() {
  return new Promise(resolve => {
    const dropdown = document.getElementById("treeSelector");
    dropdown.addEventListener("change", () => {
      resolve(dropdown.value);
    });
  });
}
var newickTree = "" ; 
var display_names = "" ;
var possible_guesses = "" ; 
var leaf_names = "" ;

async function main() {

  const selectedTree = await setTree();
  const dropdown = document.getElementById("treeSelector");
  dropdown.disabled = true; 

  itemDiv.style.display = "block" ;
  inputDiv.style.display = "block" ;
  lucky.style.display = "block";

  /// set our tree here
  if ( selectedTree == "nicomammals" ) { 
    display_names = nico_display_names;
    newickTree = nico_newickTree;
    leaf_names = nico_leaf_names;
  }
  else if ( selectedTree == "gigamammal") {
    display_names = gigamammal_display_names;
    newickTree = gigamammal_newickTree;
    leaf_names = gigamammal_leaf_names;
  }
  else if ( selectedTree == "maxmammal") {
    display_names = max_display_names;
    newickTree = max_newickTree;
    leaf_names = max_leaf_names;
  }

  /// list to record possible guesses
  let possible_guesses = [...display_names] ; 

/// set target here
var target = replaceRandomElement( leaf_names ) ; 
console.log('TARGET IS');
console.log(target);
/// then replace the target in the tree
var newick = newickTree.replace( target, "Target");
/// store as a useful tree object
jsonTree = setNodeIDs( parse( newick ) ) ;
// / then put target into the existing guess list
var guesses = ["Target"] ; 

/// parsing function to create useful representation of newick
var node_num = 0 ; 

/// get the path to Target node
const targetNode = findLeafNode( jsonTree, "Target" ) ;
if (!targetNode) {
  console.log("NODE NOT FOUND");
}
const pathToTarget = findPathToNode( jsonTree, targetNode ) ;
if (!pathToTarget) {
  console.log("PATH NOT FOUND");
}
sortTree(jsonTree, pathToTarget) ; 


function guess_taxon(display_name_of_selected_taxon){

    // add the selected item to the selected items list we display and to one we are keeping
    if (selectedTaxon !== "") {

      $("#selectedItemsList").append("<li>" + selectedTaxon + "</li>"); //deprecated? 
      guesses.push(selectedTaxon) ; 

      // added this to uniqueify guesses
      guesses = [...new Set(guesses)]

      /// prune the list of selected taxa from the newick
      /// probably could do this only once as long as we deep copy the tree object
      const parsedTree = structuredClone( jsonTree ) ; 
      var prunedTree = filter(parsedTree, guesses); 
      var prunedNewick = toNewick( prunedTree ) + ";" ; 

      // clear the previous tree
      document.getElementById("tree_display").innerHTML = "" ;

      // update the list of possible guesses so we only display things not alreday guessed
      let indexToDelete = possible_guesses.indexOf(display_name_of_selected_taxon) ;
      if (indexToDelete !== -1) {
          possible_guesses.splice(indexToDelete, 1);
      }
      console.log( possible_guesses.length ) ; 


      // should be some kind of real celebration
      replaceID = "   Guess This Species" ; 
      if ( selectedTaxon === target ) {
          replaceID = "   " + display_names[leaf_names.indexOf(guesses[guesses.length-1])] ;
          guess_total = guesses.length - 1 ;
          rhinoDiv.style.display = "block" ;
          nicoDiv.style.display = "block" ; 
          document.querySelector("#buttons").style.display = "none";
          document.getElementById("winspace").style.display = "flex"; 
      }

      //// but also what we do if we don't have it
      else {
          //var distance = findDistance( prunedTree, "Target", selectedTaxon ) ; 
          prunedNewick = prunedNewick.replace(selectedTaxon,"last_guess") ;
          distance = findDistance( prunedTree, "Target", selectedTaxon ) ;
      }

      console.log("TARGET: " + target)
      console.log("CHOICE: " + selectedTaxon)


      var tree_styles = {
        // set colour, shape and label for last guess and target. 
        last_guess: {  label: selectedTaxon, shape: phylocanvas.Shapes.DoubleChevronRight },
        Target: { fillColour: "#3972ff", label: replaceID, shape: phylocanvas.Shapes.ChevronRight },
      }

      var last_guess_dist = (findDistance( prunedTree, "Target", selectedTaxon ) * 50).toFixed(2) 
      
      tree_styles['last_guess'].label = " ".repeat(Math.max(0,8-last_guess_dist.length)) + last_guess_dist + " MY | " + display_name_of_selected_taxon

      for(let i = 1; i < guesses.length; i++){
        var disp_name = display_names[leaf_names.indexOf(guesses[i])] ; 
        var distance = (findDistance( prunedTree, "Target", guesses[i] ) * 50).toFixed(2) ; 
        tree_styles[guesses[i]] = {label:" ".repeat(Math.max(0,8-distance.length)) + distance + " MY | " + disp_name} ; 
      }

      /// now render this. 
      const tree = new phylocanvas.PhylocanvasGL(
        document.querySelector("#tree_display"),
        {
            styles: tree_styles, 
            // height function is junk if guessed right becuase the height gets larger 
            size: { width: window.innerWidth * 0.8 , height: guesses.length*40 },
            showLabels: true,
            showLeafLabels: true,
            source: prunedNewick ,
            alignLabels: false,
            showBranchLengths: false, 
            fontFamily: "Roboto Mono" , 
            padding: 0 ,
        },
      );
    }

    // remove phylocanvas logo ( sorry we love you but its not our style )
    document.getElementById("tree_display").style.backgroundImage = "";

    // clear the input field
    $("#taxonInput").val("");
}

/// main interactive elements 
$("#taxonInput").autocomplete({
    source: possible_guesses
  });

  // add click listener to the "Add taxon" button
  $("#addItemButton").click(function() {
    // get the value of the item input field
    
    var display_name_of_selected_taxon = $("#taxonInput").val() ; 
    console.log(display_name_of_selected_taxon)
    if (display_name_of_selected_taxon == "") {
      console.log("Trying to guess");
      //pick five at random
      const possibleHints = getRandomValuesFromArray(leaf_names);
      console.log(possibleHints);
      let minDist = findDistance(jsonTree, "Target", possibleHints[0]);

      /// note to selves: make this not stupid
      /// should not hint the same as previous guesses
      /// does not need to redraw all when the first is the target

      while ( minDist !== null ) { 
          possibleHints = getRandomValuesFromArray(leaf_names);
          minDist = findDistance(jsonTree, "Target", possibleHints[0]);
      }
      let guess = possibleHints[0];    
      for (let i = 1; i < possibleHints.length; i++) {
        let tmd = findDistance(jsonTree, "Target", possibleHints[i]);
        if ((tmd < minDist) && (minDist !== null)) {
          minDist = tmd;
          guess = possibleHints[i];
        }
      }
      selectedTaxon = guess;
      display_name_of_selected_taxon = display_names[leaf_names.indexOf(guess)];
    } else {
      selectedTaxon = leaf_names[display_names.indexOf(display_name_of_selected_taxon)] ; 
    }

    guess_taxon(display_name_of_selected_taxon)

  });

  $("#imlucky").click(function() {

    let targetIndex = possible_guesses.indexOf(display_names[leaf_names.indexOf(target)]) ;
    const randomIndex = Math.floor(Math.random() * possible_guesses.length); 

    while ( randomIndex === targetIndex ) { 
        randomIndex = Math.floor(Math.random() * possible_guesses.length);
    }
    /// was this ever necessary?
    selectedTaxon = leaf_names[display_names.indexOf(possible_guesses[randomIndex])] ; 
    /// this is our bug because we need a way to go back 

    guess_taxon(possible_guesses[randomIndex])
  }
  )

}















function parse(newick) {
  let nextid = 0;
  const regex = /([^;:,()\s]*)(?:\s*:\s*([\d.eE+-]+)\s*)?([,);])|(\S)/g;
  newick += ";"
  
  return (function recurse(parentid = -1) {
      const children = [];
      let name, length, delim, ch, all, id = nextid++ ;

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

/// this will filter a tree to retain only tips in the list and their parents
function filter(tree, list) {
  let filteredChildren = [];

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


function toNewick(tree) {
let newick = "";
if (tree.children) {
  if (tree.children.length > 0) {
    newick += "(";
    tree.children.forEach((child, i) => {
      newick += toNewick(child);
      if (i < tree.children.length - 1) {
        newick += ",";
      }
    });
    newick += ")";
  }
}
newick += tree.name ;
if (tree.length) {
  newick += ":" + tree.length;
}
//  newick += ";";
return newick;
} 

/// get taxa ids
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

/// randomly select a taxon from the list
function replaceRandomElement ( array ) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex] ;
}

/// sort the tree so that the sample at the end of the path is always on top
function sortTree (root, pathToTarget) {
  let node = root;
  for (let i = 1; i < pathToTarget.length; i++){
    if(node.children[1].id == pathToTarget[i].id){
      let temp = node.children[0] ; 
      node.children[0] = node.children[1];
      node.children[1] = temp;
    }
    node = node.children[0] ; 
  }
}

/// parse newicj into useful tree object
function parse(newick) {
  let nextid = 0;
  const regex = /([^;:,()\s]*)(?:\s*:\s*([\d.eE+-]+)\s*)?([,);])|(\S)/g;
  newick += ";"
  
  return (function recurse(parentid = -1) {
      const children = [];
      let name, length, delim, ch, all, id = nextid++ ;

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

/// take our tree back to newick for phylocanvas
function toNewick(tree) {
let newick = "";
if (tree.children) {
  if(tree.children.length > 0){
  newick += "(";
  tree.children.forEach((child, i) => {
    newick += toNewick(child);
    if (i < tree.children.length - 1) {
      newick += ",";
    }
  });
  newick += ")";
  }
}
newick += tree.name ;
if (tree.length) {
  newick += ":" + tree.length;
}
//  newick += ";";
return newick;
} 

/// give internal nodes IDs if they are empty
function setNodeIDs( tree ) {
  var node_num = 0 ; 
  // get all node ids using recursion
  function traverse(node) {
    if (node.children) {
      for (let child of node.children) {
        traverse(child);
      }
    }
    if ( node.name == "" ) { 
      node.name = "node" + node_num.toString() ; 
      node_num ++ ; 
    }
  }
  traverse(tree);
  return tree ;
}

/// functions to find a specific node by name
function findLeafNode(root, leafName) {
  if (!root) return null;
  if (root.name === leafName) return root;
  for (const child of root.children) {
    const leaf = findLeafNode(child, leafName);
    if (leaf) return leaf;
  }
  return null;
}

function lowestCommonAncestor(root, p, q) {
  if (!root) return null;
  if (root.name === p || root.name === q) return root.name;
  const childResults = root.children.map(child => lowestCommonAncestor(child, p, q));
  const foundChildren = childResults.filter(result => result !== null);
  if (foundChildren.length === 2) return root.name;
  if (foundChildren.length === 1) return foundChildren[0];
  return null;
}

function distToAncestor(tree, lca, node) {
  const pathToAncestor = [];
  let currentNode = node;
  while (currentNode !== lca) {
    pathToAncestor.push(currentNode);
    currentNode = findLeafNode(tree, currentNode.parentid.toString());
  }
  pathToAncestor.push(lca);
  var distance = 0 ; 
  for ( const nodeOnPath of pathToAncestor ) {
    distance += nodeOnPath.length ; 
  }
  return distance ; 
}

function findPathToNode(tree, targetNode, path = []) {
  if (tree === targetNode) {
    return [...path, tree];
  }
  for (let i = 0; i < tree.children.length; i++) {
    const node = findPathToNode(tree.children[i], targetNode, [...path, tree]);
    if (node !== null) {
      return node;
    }
  }
  return null;
}

function computePathDistance( path, lca ) {
  var distance = 0 ; 
  var passedLCA = 0 ; 
  for (let i = 0; i < path.length; i++) {
    if ( passedLCA == 1 ) { 
      if ( path[i].length ) {
        distance += path[i].length ; 
      }
    }
    if ( path[i].name == lca ) {
      passedLCA = 1; 
    }
  }
  return distance ; 
}

function findDistance(tree, leaf1, leaf2) {
  const node1 = findLeafNode(tree, leaf1);
  const node2 = findLeafNode(tree, leaf2);

  if (!node1 || !node2) return null;
  const lca = lowestCommonAncestor(tree, node1.name, node2.name);

  /// these could easily be simplified/combined into one function since we're doign a traversal to store a path, then traversing the path. 
  /// it is convenient to have the path function separate though since i will use it later to reorient the tree. 
  const pathToNode1 = findPathToNode( tree, node1 ) ; 
  const pathToNode2 = findPathToNode( tree, node2 ) ; 
  distance = computePathDistance( pathToNode1, lca ) + computePathDistance( pathToNode2, lca ) ;

  return( distance ) ; 
}

/// get taxa ids
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


/// to be updated with a score and a more subversive message
/// probably should have the button appear after the user finishes. 
function tweet(  ) {
  var text = "I just scored a " + guess_total + " on Phylo-Le" ; 
  var url = encodeURIComponent("https://www.Phylo-Le.com"); 
  var tweetUrl = "https://twitter.com/intent/tweet?text=" + text + "&url=" + url;
  window.open(tweetUrl);
}

function reset() {
  location.reload();
}

function redirectToLab() {
  window.open("https://secure.ucsc.edu/s/1069/bp18/interior.aspx?sid=1069&gid=1001&pgid=780&cid=1749&dids=1186", "_blank");
}



function imlucky(){
  
}

