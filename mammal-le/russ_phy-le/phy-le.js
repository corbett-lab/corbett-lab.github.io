// input data definitions
//const taxa = ["Homo_sapiens","Pan_troglodytes","Gorilla_gorilla","Canis_lupus","Felis_catus","Equus_caballus","Bos_taurus"] ;
//const newickTree = "(((Homo_sapiens:0.005,Pan_troglodytes:0.01):0.02,Gorilla_gorilla:0.03):0.04,(Canis_lupus:0.015,Felis_catus:0.02):0.05,(Equus_caballus:0.02,Bos_taurus:0.03):0.06);"

const newickTree = "(((((Felis_catus:11.91318000,Panthera_leo:11.91318000):43.44846000,((((Canis_lupus_arctos:0.08000000,Canis_lupus_familiaris:0.08000000):0.42500000,Canis_lupus_lupus:0.50500000):0.21750000,(Canis_lupus_campestris:0.72250000,Canis_lupus_laniger:0.72250000):0.00000000):44.37750000,(Phoca_vitulina:40.12000000,(Ursus_americanus:4.87940000,Ursus_arctos:4.87940000):35.24060000):4.98000000):10.26164000):20.63836000,(((Orcinus_orca:9.68381000,Tursiops_truncatus:9.68381000):48.10429000,(Bos_taurus:21.62563000,Ovis_aries:21.62563000):36.16247000):4.05455000,Sus_scrofa:61.84265000):14.15735000):18.00000000,((Sciurus_carolinensis:70.20250000,(Rattus_norvegicus:11.64917000,(Mus_musculus_gentilulus:0.81300000,(((Mus_musculus_molossinus:0.05650000,Mus_musculus_musculus:0.05650000):0.31450000,Mus_musculus_castaneus:0.37100000):0.22755000,Mus_musculus_domesticus:0.59855000):0.21445000):10.83617000):58.55333000):16.99750000,((Saimiri_boliviensis_boliviensis:1.10000000,Saimiri_boliviensis_peruviensis:1.10000000):41.80000000,(Gorilla_gorilla:28.82000000,(Macaca_fascicularis_aureus:0.99059000,(Macaca_fascicularis_fascicularis:0.20452000,Macaca_fascicularis_philippinensis:0.20452000):0.78607000):27.82941000):14.08000000):44.30000000):6.80000000):5.18870000,Loxodonta_africana:99.18870000);" ;
const taxa = ["Felis_catus","Panthera_leo","Canis_lupus_arctos","Canis_lupus_familiaris","Canis_lupus_lupus","Canis_lupus_campestris","Canis_lupus_laniger","Phoca_vitulina","Ursus_americanus","Ursus_arctos","Orcinus_orca","Tursiops_truncatus","Bos_taurus","Ovis_aries","Sus_scrofa","Sciurus_carolinensis","Rattus_norvegicus","Mus_musculus_gentilulus","Mus_musculus_molossinus","Mus_musculus_musculus","Mus_musculus_castaneus","Mus_musculus_domesticus","Saimiri_boliviensis_boliviensis","Saimiri_boliviensis_peruviensis","Gorilla_gorilla","Macaca_fascicularis_aureus","Macaca_fascicularis_fascicularis","Macaca_fascicularis_philippinensis","Loxodonta_africana"] ;

/// randomly select a taxon from the list
function replaceRandomElement ( array ) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex] ;
}

/// set target here
var target = replaceRandomElement( taxa ) ; 

/// then replace the target in the tree
var newick = newickTree.replace( target, "Target");
console.log(newick) ; 

/// then put target into the existing guess list
var guesses = ["Target"] ; 

/// parsing function to create useful representation of newick
function parse(newick) {
    let nextid = 0;
    const regex = /([^:;,()\s]*)(?:\s*:\s*([\d.]+)\s*)?([,);])|(\S)/g;
    newick += ";"
    
    return (function recurse(parentid = -1) {
        const children = [];
        let name, length, delim, ch, all, id = nextid++;;

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

      // should be some kind of real celebration
      if ( selectedTaxon == target ) {
          $("#GotIt").append("You Got It: " + selectedTaxon + "!");
      }

      $("#selectedItemsList").append("<li>" + selectedTaxon + "</li>");
      guesses.push(selectedTaxon) ; 

      // prune the list of selected taxa from the newick
      const parsedTree = parse(newick);
      var prunedTree = filter(parsedTree, guesses); 
      var prunedNewick = toNewick( prunedTree ) + ";" ; 

      // clear the previous tree
      document.getElementById("tree_display").innerHTML = "" ;

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

    }

    // clear the item input field
    $("#itemInput").val("");

});

  
  
  
  