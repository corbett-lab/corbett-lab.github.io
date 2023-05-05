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

// console.log("before import");
// import {supermammal_leaf_names, supermammal_newickTree, supermammal_display_names} from "./data.js";
// console.log("after import");
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
var leaf_names = "" ;

async function main() {

  const selectedTree = await setTree();
  const dropdown = document.getElementById("treeSelector");
  dropdown.disabled = true; 

  itemDiv.style.display = "block" ;
  inputDiv.style.display = "block" ;
  lucky.style.display = "block";

  console.log(selectedTree);

  /// set our tree here
  

  /// set our tree here
  if ( selectedTree == "mammals" ) { 
    display_names = ['African bush elephant, Loxodonta africana','African forest elephant, Loxodonta cyclotis','African wild dog, Lycaon pictus','American black bear, Ursus americanus','Arctic fox, Vulpes lagopus','Arctic hare, Lepus arcticus','Armadillo, Dasypus novemcinctus','Asian elephant, Elephas maximus','Baboon, Papio','Badger, Meles meles','Banded mongoose, Mungos mungo','Beaver, Castor canadensis','Black rhinoceros, Diceros bicornis','Blue whale, Balaenoptera musculus','Bonobo, Pan paniscus','Brown bear, Ursus arctos','Brown rat, Rattus norvegicus','Camel, Camelus bactrianus','Capybara, Hydrochoerus hydrochaeris','Cheetah, Acinonyx jubatus','Chimpanzee, Pan troglodytes','Common dolphin, Delphinus delphis','Cougar, Puma concolor','Coyote, Canis latrans','Dama gazelle, Nanger dama','Dingo, Canis lupus dingo','Domestic cat, Felis catus','Domestic cow, Bos taurus','Domestic pig, Sus scrofa domesticus','Domestic sheep, Ovis aries','Dugong, Dugong dugon','Eastern gray squirrel, Sciurus carolinensis','Echidna, Tachyglossus aculeatus','Elephant seal, Mirounga','Elk, Cervus canadensis','European hare, Lepus europaeus','European otter, Lutra lutra','Fallow deer, Dama dama','Ferret, Mustela putorius furo','Fin whale, Balaenoptera physalus','Fox, Vulpes','Giraffe, Giraffa camelopardalis','Gnu, Connochaetes','Golden jackal, Canis aureus','Gorilla, Gorilla','Gray fox, Urocyon cinereoargenteus','Gray seal, Halichoerus grypus','Gray wolf, Canis','Groundhog, Marmota monax','Hare, Lepus','Harbor seal, Phoca vitulina','Hippopotamus, Hippopotamus amphibius','Honey badger, Mellivora capensis','Horse, Equus caballus','House mouse, Mus musculus','Human, Homo sapiens','Humpback whale, Megaptera novaeangliae','Jaguar, Panthera onca','Kangaroo, Macropus','Koala, Phascolarctos cinereus','Leopard, Panthera pardus','Lion, Panthera leo','Little brown bat, Myotis lucifugus','Lynx, Lynx','Manatee, Trichechus','Marmot, Marmota','Meerkat, Suricata suricatta','Minke whale, Balaenoptera acutorostrata','Moose, Alces alces','Mountain goat, Oreamnos americanus','Mountain lion, Puma concolor','Musk ox, Ovibos moschatus','Nutria, Myocastor coypus','Ocelot, Leopardus pardalis','Orangutan, Pongo','Orca, Orcinus orca','Otter, Lutra','Pika, Ochotona','Pilot whale, Globicephala','Platypus, Ornithorhynchus anatinus','Polar bear, Ursus maritimus','Porcupine, Erethizon dorsatum','Prairie dog, Cynomys','Pronghorn, Antilocapra americana','Puma, Puma','Rabbit, Oryctolagus cuniculus','Raccoon, Procyon lotor','Red fox, Vulpes vulpes','Red kangaroo, Macropus rufus','Red panda, Ailurus fulgens','Red squirrel, Tamiasciurus hudsonicus','Reindeer, Rangifer tarandus','River dolphin, Platanista','Roe deer, Capreolus capreolus','Saiga antelope, Saiga tatarica','Sea otter, Enhydra lutris','Sheep, Ovis aries','Siberian tiger, Panthera tigris altaica','Skunk, Mephitis mephitis','Sloth, Bradypus','Snow leopard, Panthera uncia','Snowshoe hare, Lepus americanus','Spectacled bear, Tremarctos ornatus','Spotted hyena, Crocuta crocuta','Striped dolphin, Stenella coeruleoalba','Tasmanian devil, Sarcophilus harrisii','Tarsier, Tarsius','Tasmanian devil, Sarcophilus harrisii','Tiger, Panthera tigris','Walrus, Odobenus rosmarus','Warthog, Phacochoerus africanus','Water buffalo, Bubalus bubalis','Weasel, Mustela','Wild boar, Sus scrofa','Wolverine, Gulo gulo','Wolf, Canis lupus','Wombat, Vombatus ursinus','Yak, Bos grunniens','Gerbal, Meriones unguiculatus','Marmoset, Callimico goeldii','Domestic dog, Canis familiaris',];
    newickTree = '((ornithorhynchus_anatinus:0.66537,tachyglossus_aculeatus:0.66537):1.35799,((((dasypus_novemcinctus:0.63559,bradypus_variegatus:0.63559):0.15218,(((loxodonta_africana:0.04242,loxodonta_cyclotis:0.04242):0.01194,elephas_maximus:0.05436):0.51318,(trichechus_manatus:0.34028,dugong_dugon:0.34028):0.22727):0.22022):0.01507,((((((lepus_europaeus:0.13071,((lepus_granatensis:0.00682,lepus_arcticus:0.00682):0.10287,lepus_americanus:0.10969):0.02102):0.17761,oryctolagus_cuniculus_algirus:0.30832):0.17479,ochotona_annectens:0.48312):0.17927,(((((mus_musculus_bactrianus:0.11927,rattus_norvegicus:0.11929):0.05684,meriones_unguiculatus:0.17611):0.36053,castor_canadensis:0.53668):0.0563,((myocastor_coypus:0.37074,erethizon_dorsatum:0.37073):0.0069,hydrochoerus_hydrochaeris:0.37762):0.21533):0.01482,((cynomys_gunnisoni:0.1778,(marmota_monax:0.06704,marmota_caligata:0.06701):0.11077):0.2431,(sciurus_carolinensis:0.22016,tamiasciurus_hudsonicus:0.22017):0.20076):0.18688):0.05459):0.03574,(((papio_ursinus:0.2964,((((pan_paniscus:0.03834,pan_troglodytes_ellioti:0.03833):0.05241,homo_sapiens:0.09075):0.02509,gorilla_beringei_graueri:0.11583):0.07775,pongo_pygmaeus:0.19358):0.10281):0.11253,callimico_goeldii:0.40892):0.19653,tarsius_sangirensis:0.60546):0.09267):0.05321,(((((((((((lutra_lutra:0.09875,enhydra_lutris:0.09876):0.06292,(mustela_putorius:0.00058,mustela_putorius_furo:0.00058):0.16108):0.02709,gulo_gulo:0.18876):0.01189,(mellivora_capensis:0.18926,meles_meles_arcalus:0.18926):0.01139):0.11831,procyon_lotor:0.31895):0.02841,(mephitis_mephitis:0.32797,ailurus_fulgens:0.32798):0.01939):0.04959,((((phoca_vitulina_stejnegeri:0.03419,halichoerus_grypus:0.0342):0.14265,mirounga_leonina:0.17685):0.08678,odobenus_rosmarus_divergens:0.26364):0.12426,(tremarctos_ornatus:0.18798,((ursus_maritimus:0.01521,ursus_arctos:0.01521):0.06303,ursus_americanus:0.07824):0.10974):0.19991):0.00907):0.06483,((((vulpes_cana:0.03974,vulpes_vulpes:0.03974):0.07903,vulpes_lagopus:0.11876):0.13505,urocyon_cinereoargenteus:0.25381):0.01615,((((canis_lupus_dingo:0.0026,canis_familiaris:0.0026):0.05905,canis_aureus:0.06164):0.02692,canis_latrans:0.08856):0.07999,lycaon_pictus:0.16856):0.10141):0.19182):0.0555,(((suricata_suricatta:0.09665,mungos_mungo:0.09666):0.18939,crocuta_crocuta:0.28603):0.07103,(((felis_catus:0.1609,((acinonyx_jubatus:0.1039,puma_concolor_couguar:0.10391):0.02467,lynx_pardinus:0.12857):0.03232):0.01657,leopardus_pardalis:0.17748):0.0213,((((panthera_pardus_orientalis:0.05997,panthera_leo_persica:0.05997):0.01439,panthera_uncia:0.07436):0.01011,panthera_onca:0.08447):0.01861,(panthera_tigris_sumatrae:0.00304,panthera_tigris_altaica:0.00305):0.10002):0.09571):0.15828):0.16023):0.14929,((equus_caballus:0.55714,diceros_bicornis:0.55714):0.09543,((((((((orcinus_orca:0.08043,globicephala_macrorhynchus:0.08044):0.00392,(delphinus_delphis:0.02411,stenella_coeruleoalba:0.02411):0.06025):0.21727,platanista_minor:0.30163):0.03418,(((megaptera_novaeangliae:0.11358,balaenoptera_physalus:0.11358):0.04862,balaenoptera_musculus:0.1622):0.02648,balaenoptera_acutorostrata:0.18868):0.14714):0.1455,hippopotamus_amphibius:0.48131):0.02755,((((((((oreamnos_americanus:0.11429,ovis_aries_musimon:0.1143):0.01394,ovibos_moschatus:0.12824):0.0437,connochaetes_taurinus:0.17193):0.02463,(nanger_dama_mhorr:0.12451,saiga_tatarica:0.12451):0.07205):0.04142,((bos_grunniens:0.07403,bos_taurus:0.07403):0.08911,bubalus_bubalis:0.16314):0.07485):0.03166,(((capreolus_capreolus:0.15576,alces_alces:0.15576):0.01097,rangifer_tarandus:0.16672):0.01994,(cervus_canadensis_songaricus:0.10762,dama_dama:0.1076):0.07906):0.08299):0.01911,giraffa_camelopardalis_antiquorum:0.28875):0.02241,antilocapra_americana_sonoriensis:0.31117):0.19769):0.0414,((sus_scrofa_domesticus:0.0266,sus_scrofa_taiwanensis:0.0266):0.14113,phacochoerus_africanus:0.16773):0.38253):0.02876,camelus_bactrianus:0.57903):0.07355):0.01401):0.034,myotis_lucifugus_relictus:0.70058):0.05075):0.05151):0.6155,(((phascolarctos_cinereus:0.28822,vombatus_ursinus:0.28822):0.08491,(macropus_rufogriseus_banksianus:0.09039,macropus_rufus:0.09039):0.28273):0.04429,sarcophilus_harrisii:0.41741):1.00092):0.60502);';
    leaf_names = ['loxodonta_africana','loxodonta_cyclotis','lycaon_pictus','ursus_americanus','vulpes_lagopus','lepus_arcticus','dasypus_novemcinctus','elephas_maximus','papio_ursinus','meles_meles_arcalus','mungos_mungo','castor_canadensis','diceros_bicornis','balaenoptera_musculus','pan_paniscus','ursus_arctos','rattus_norvegicus','camelus_bactrianus','hydrochoerus_hydrochaeris','acinonyx_jubatus','pan_troglodytes_ellioti','delphinus_delphis','puma_concolor_couguar','canis_latrans','nanger_dama_mhorr','canis_lupus_dingo','felis_catus','bos_taurus','sus_scrofa_domesticus','ovis_aries_musimon','dugong_dugon','sciurus_carolinensis','tachyglossus_aculeatus','mirounga_leonina','cervus_canadensis_songaricus','lepus_europaeus','lutra_lutra','dama_dama','mustela_putorius_furo','balaenoptera_physalus','vulpes_cana','giraffa_camelopardalis_antiquorum','connochaetes_taurinus','canis_aureus','gorilla_beringei_graueri','urocyon_cinereoargenteus','halichoerus_grypus','canis_lupus_dingo','marmota_monax','lepus_granatensis','phoca_vitulina_stejnegeri','hippopotamus_amphibius','mellivora_capensis','equus_caballus','mus_musculus_bactrianus','homo_sapiens','megaptera_novaeangliae','panthera_onca','macropus_rufogriseus_banksianus','phascolarctos_cinereus','panthera_pardus_orientalis','panthera_leo_persica','myotis_lucifugus_relictus','lynx_pardinus','trichechus_manatus','marmota_caligata','suricata_suricatta','balaenoptera_acutorostrata','alces_alces','oreamnos_americanus','puma_concolor_couguar','ovibos_moschatus','myocastor_coypus','leopardus_pardalis','pongo_pygmaeus','orcinus_orca','lutra_lutra','ochotona_annectens','globicephala_macrorhynchus','ornithorhynchus_anatinus','ursus_maritimus','erethizon_dorsatum','cynomys_gunnisoni','antilocapra_americana_sonoriensis','puma_concolor_couguar','oryctolagus_cuniculus_algirus','procyon_lotor','vulpes_vulpes','macropus_rufus','ailurus_fulgens','tamiasciurus_hudsonicus','rangifer_tarandus','platanista_minor','capreolus_capreolus','saiga_tatarica','enhydra_lutris','ovis_aries_musimon','panthera_tigris_altaica','mephitis_mephitis','bradypus_variegatus','panthera_uncia','lepus_americanus','tremarctos_ornatus','crocuta_crocuta','stenella_coeruleoalba','sarcophilus_harrisii','tarsius_sangirensis','sarcophilus_harrisii','panthera_tigris_sumatrae','odobenus_rosmarus_divergens','phacochoerus_africanus','bubalus_bubalis','mustela_putorius','sus_scrofa_taiwanensis','gulo_gulo','canis_lupus_dingo','vombatus_ursinus','bos_grunniens','meriones_unguiculatus','callimico_goeldii','canis_familiaris',];
    
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
/// set target here
var target = replaceRandomElement( leaf_names ) ; 
console.log('TARGET IS');
console.log(target);
/// then replace the target in the tree
var newick = newickTree.replace( target, "Target");
/// store as a useful tree object
jsonTree = setNodeIDs( parse( newick ) ) ;
// console.log(toNewick(jsonTree));
// console.log(getNodeIds(jsonTree));
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
function getRandomValuesFromArray(arr) {
  //chatGPT generated
  // console.log("Beginning random fetch")
  const result = [];
  const arrCopy = arr.slice(0); // create a copy of the original array to avoid modifying it
  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * arrCopy.length);
    result.push(arrCopy[randomIndex]);
    arrCopy.splice(randomIndex, 1); // remove the selected element from the copy
  }
  return result;
}


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

      // should be some kind of real celebration
      replaceID = "Guess This Species" ; 
      if ( selectedTaxon == target ) {
          replaceID = display_names[leaf_names.indexOf(guesses[guesses.length-1])] ;
          guess_total = guesses.length - 1 ;
          rhinoDiv.style.display = "block" ;
          nicoDiv.style.display = "block" ; 
          
          /*var tweet = document.getElementById("tweetButton") ; 
          var reset = document.getElementById("resetButton") ; 
          var give = document.getElementById("giveButton") ; 
          reset.style.display="block" ;
          tweet.style.display="block" ;
          give.style.display="block" ;
          */
          

          document.getElementById("winspace").style.display = "flex"
      }
      
      //// but also what we do if we don't have it
      else {
          //var distance = findDistance( prunedTree, "Target", selectedTaxon ) ; 
          prunedNewick = prunedNewick.replace(selectedTaxon,"last_guess") ;
          distance = findDistance( prunedTree, "Target", selectedTaxon ) ;
          console.log(distance)
      }

      console.log("TARGET: " + target)
      console.log("CHOICE: " + selectedTaxon)

      var tree_styles = {
        // set colour, shape and label for last guess and target. 
        last_guess: { fillColour: "blue", label: selectedTaxon, shape: phylocanvas.Shapes.Star },
        Target: { fillColour: "red", label: replaceID, shape: phylocanvas.Shapes.Star },
      }
      
      
      

      var last_guess_dist = (findDistance( prunedTree, "Target", selectedTaxon ) * 50).toFixed(2) 
      

      tree_styles['last_guess'].label = " ".repeat(Math.min(0,7-last_guess_dist.length)) + last_guess_dist + " " + display_name_of_selected_taxon

      for(let i = 1; i < guesses.length; i++){
        var disp_name = display_names[leaf_names.indexOf(guesses[i])] ; 
        var distance = (findDistance( prunedTree, "Target", guesses[i] ) * 50).toFixed(2) ; 
        tree_styles[guesses[i]] = {label:" ".repeat(Math.min(0,7-distance.length)) + distance + " " + disp_name} ; 
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
    source: display_names
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
      // console.log(guess);
      // console.log(minDist);
      selectedTaxon = guess;
      display_name_of_selected_taxon = display_names[leaf_names.indexOf(guess)];
    } else {
      selectedTaxon = leaf_names[display_names.indexOf(display_name_of_selected_taxon)] ; 
    }


    guess_taxon(display_name_of_selected_taxon)


  });

  $("#imlucky").click(function() {
    const randomIndex = Math.floor(Math.random() * display_names.length);
    selectedTaxon = leaf_names[display_names.indexOf(display_names[randomIndex])] ; 

    guess_taxon(display_names[randomIndex])
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
  // console.log("FOUND NODES");
  // console.log(node1);
  // console.log(node2);
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
function tweet( ) {
  var text = "I blew my mind and scored a " + guess_total + " on Phylo-Le" ; 
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
