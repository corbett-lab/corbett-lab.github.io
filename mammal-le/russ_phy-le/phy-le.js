/// good hints 
/// insulting when you guess species not in the tree
/// rotate tree by shuffling child array at each node
/// can we also arrange the tree so that the target is always on the top?
  //// yes, this is an easy algorithm
  //// find the full path from root to target, 
  //// then, sort each child array so the path is first

/// it should color the last guess differently as well. 

// animals to add: 
// seal, whale, otter, orca, dolphin, armadillo, honeybadger, beaver, aardvark, possu, pangolin

// turn off the rhino and nico at the beginning
let rhinoDiv = document.getElementById("rhino") ; 
rhinoDiv.style.display = "none" ;
let nicoDiv = document.getElementById("nico") ; 
nicoDiv.style.display = "none" ;
/// turn off input initally 
let inputDiv = document.getElementById("taxonInput") ; 
inputDiv.style.display = "none" ;
let itemDiv = document.getElementById("addItemButton") ; 
itemDiv.style.display = "none" ;

main() ; 

function setTree() {
  return new Promise(resolve => {
    const dropdown = document.getElementById("treeSelector");
    dropdown.addEventListener("change", () => {
      resolve(dropdown.value);
    });
  });
}

async function main() {
  const selectedTree = await setTree();
  const dropdown = document.getElementById("treeSelector");
  dropdown.disabled = true; 

  itemDiv.style.display = "block" ;
  inputDiv.style.display = "block" ;
  console.log(selectedTree);
  // The rest of your code goes here...


  /// set our tree here
  var newickTree = "" ; 
    if ( selectedTree == "mammals" ) { 
     newickTree = "(((Macropus_giganteus_Giant_kangaroo:52.64000000,Phascolarctos_cinereus_Koala:52.64000000):107.36000000,((((((((Puma_concolor_Mountain_lion:11.22499000,Felis_catus_Domestic_cat:11.22499000):0.68819000,(Panthera_tigris_tigris_Bengal_tiger:6.76700000,Panthera_leo_Lion:6.76700000):5.14618000):43.44846000,((Vulpes_vulpes_Red_fox:12.24414000,(Canis_lupus_familiaris_Domestic_dog:0.50500000,Canis_lupus_lupus_Gray_wolf:0.50500000):11.73914000):32.85586000,((((Taxidea_taxus_American_badger:20.30000000,(Gulo_gulo_Wolverine:13.50000000,Mustela_putorius_Ferret:13.50000000):6.80000000):8.07665000,Procyon_lotor_Common_raccoon:28.37665000):3.97745000,Mephitis_mephitis_Striped_skunk:32.35410000):7.76590000,(Ailuropoda_melanoleuca_Giant_panda:19.25625000,(Ursus_americanus_American_black_bear:4.87940000,Ursus_maritimus_Polar_bear:4.87940000):14.37685000):20.86375000):4.98000000):10.26164000):18.88836000,(Equus_caballus_Horse:11.10000000,Equus_asinus_Donkey:11.10000000):63.15000000):1.75000000,(((Vicugna_pacos_Alpaca:0.65714000,Lama_glama_Llama:0.65714000):20.25989000,Camelus_dromedarius_Dromedary_camel:20.91703000):43.08297000,((((((Bos_grunniens_Yak:1.49662000,Bison_bison_Buffalo:1.49662000):2.80348000,Bos_taurus_Cow:4.30010000):17.32553000,(Capra_hircus_Goat:7.65408000,Ovis_aries_Sheep:7.65408000):13.97155000):2.06947000,(Alces_alces_Moose:10.99420000,Odocoileus_virginianus_White-tailed_deer:10.99420000):12.70090000):3.05625000,Giraffa_reticulata_Giraffe:26.75135000):35.09130000,Sus_scrofa_Pig:61.84265000):2.15735000):12.00000000):5.02605000,Desmodus_rotundus_Common_vampire_bat:81.02605000):12.97395000,((Oryctolagus_cuniculus_European_rabbit:78.97061000,((Tamias_striatus_Eastern_chipmunk:34.46259000,Sciurus_vulgaris_Eurasian_red_squirrel:34.46259000):35.73991000,((Rattus_norvegicus_Brown_rat:11.64917000,Mus_musculus_domesticus_House_mouse:11.64917000):58.26208000,Cavia_porcellus_Guinea_pig:69.91125000):0.29125000):8.76811000):8.22939000,(((Gorilla_beringei_Eastern_gorilla:8.60000000,((Homo_sapiens_Human:1.38948000,Homo_sapiens_subsp._Denisova:1.38948000):5.01052000,Pan_troglodytes_troglodytes_Central_chimpanzee:6.40000000):2.20000000):6.60000000,Pongo_pygmaeus_Bornean_orangutan:15.20000000):13.62000000,(Papio_hamadryas_Hamadryas_baboon:10.45400000,Macaca_mulatta_brevicaudus_Pigtail_macaque:10.45400000):18.36600000):58.38000000):6.80000000):5.18870000,((Trichechus_manatus_Manatee:60.77500000,Loxodonta_africana_African_elephant:60.77500000):36.04420000,Bradypus_variegatus_Three-toed_sloth:96.81920000):2.36950000):60.81130000):20.06610000,(Tachyglossus_aculeatus:46.72840000,Ornithorhynchus_anatinus_Platypus:46.72840000):133.33770000);" ;
    }

  /// get the list of taxa in whichever tree we use
  let taxa = getNodeIds( parse( newickTree ) ) ; 

  /// set target here
  let target = replaceRandomElement( taxa ) ; 

  /// then replace the target in the tree
  var newick = newickTree.replace( target, "Target");

  /// store as a useful tree object
  jsonTree = setNodeIDs( parse( newick ) ) ;

  /// then put target into the existing guess list
  var guesses = ["Target"] ; 

  /// get the path to Target node
  const targetNode = findLeafNode( jsonTree, "Target" ) ;
  const pathToTarget = findPathToNode( jsonTree, targetNode ) ;
  sortTree(jsonTree, pathToTarget) ; 

  /// main interactive elements 
  $("#taxonInput").autocomplete({
    source: taxa
  });

  // add click listener to the "Add taxon" button
  $("#addItemButton").click(function() {
    // get the value of the item input field
    var selectedTaxon = $("#taxonInput").val();

    // add the selected item to the selected items list we display and to one we are keeping
    if (selectedTaxon !== "") {

      $("#selectedItemsList").append("<li>" + selectedTaxon + "</li>");
      guesses.push(selectedTaxon) ; 

      /// prune the list of selected taxa from the newick
      /// probably could do this only once as long as we deep copy the tree object
      const parsedTree = structuredClone( jsonTree ) ; 
      var prunedTree = filter(parsedTree, guesses); 
      var prunedNewick = toNewick( prunedTree ) + ";" ; 
      console.log(prunedNewick) ; 

      // clear the previous tree
      document.getElementById("tree_display").innerHTML = "" ;

      // should be some kind of real celebration
      replaceID = "Guess This Species" ; 
      if ( selectedTaxon == target ) {
          replaceID = target ;
          rhinoDiv.style.display = "block" ;
          nicoDiv.style.display = "block" ; 
          var tweet = document.getElementById("tweetButton") ; 
          tweet.style.display="block" ;
          guesses.shift() ; 
      }
      
      //// but also what we do if we don't have it
      else {
          prunedNewick = prunedNewick.replace(selectedTaxon,"last_guess") ; 
          /// this works for getting dstances
          var distance = findDistance( prunedTree, "Target", selectedTaxon ) ; 
      }

      /// now render this. 
      const tree = new phylocanvas.PhylocanvasGL(
        document.querySelector("#tree_display"),
        {
            styles: {
              // set colour, shape and label for last guess and target. 
              last_guess: { fillColour: "blue", label: selectedTaxon, shape: phylocanvas.Shapes.Star },
              Target: { fillColour: "red", label: replaceID, shape: phylocanvas.Shapes.Star },
            }, 
            // height function is junk if guessed right becuase the height gets larger 
            size: { width: 1200 , height: guesses.length*40 },
            showLabels: true,
            showLeafLabels: true,
            source: prunedNewick ,
            alignLabels: true,
        },
        [
            phylocanvas.plugins.scalebar,
        ],
      );

    }

    // clear the input field
    $("#itemInput").val("");

});

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
  const regex = /([^;:,()\s]*)(?:\s*:\s*([\d.]+)\s*)?([,);])|(\S)/g;
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
function tweet() {
  var guess_total = guesses.length ; 
  var text = "I blew my mind and scored a " + guess_total + " on Phylo-Le" ; 
  var url = encodeURIComponent("https://www.Phylo-Le.com"); 
  var tweetUrl = "https://twitter.com/intent/tweet?text=" + text + "&url=" + url;
  window.open(tweetUrl);
}
