/// lets switch to a root node that we always display
  /// kill the outgroups
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


// turn off the rhino at the beginning
var rhinoDiv = document.getElementById("rhino") ; 
rhinoDiv.style.display = "none" ;

//const newickTree = "((((Homo_sapiens:0.005,Pan_troglodytes:0.01):0.02,Gorilla_gorilla:0.03):0.04,((Canis_lupus:0.015,Felis_catus:0.02):0.05,(Equus_caballus:0.02,Bos_taurus:0.03):0.06):0.02):0.1,chicken:1.0);"
//const outgroup = ["chicken"] ; 






var use_tree_names = false  //if true use russ's tree, if false use nicos


if(use_tree_names){
  var newickTree = "((((Macropus_giganteus_Giant_kangaroo:52.64000000,Phascolarctos_cinereus_Koala:52.64000000):107.36000000,((((((((Puma_concolor_Mountain_lion:11.22499000,Felis_catus_Domestic_cat:11.22499000):0.68819000,(Panthera_tigris_tigris_Bengal_tiger:6.76700000,Panthera_leo_Lion:6.76700000):5.14618000):43.44846000,((Vulpes_vulpes_Red_fox:12.24414000,(Canis_lupus_familiaris_Domestic_dog:0.50500000,Canis_lupus_lupus_Gray_wolf:0.50500000):11.73914000):32.85586000,((((Taxidea_taxus_American_badger:20.30000000,(Gulo_gulo_Wolverine:13.50000000,Mustela_putorius_Ferret:13.50000000):6.80000000):8.07665000,Procyon_lotor_Common_raccoon:28.37665000):3.97745000,Mephitis_mephitis_Striped_skunk:32.35410000):7.76590000,(Ailuropoda_melanoleuca_Giant_panda:19.25625000,(Ursus_americanus_American_black_bear:4.87940000,Ursus_maritimus_Polar_bear:4.87940000):14.37685000):20.86375000):4.98000000):10.26164000):18.88836000,(Equus_caballus_Horse:11.10000000,Equus_asinus_Donkey:11.10000000):63.15000000):1.75000000,(((Vicugna_pacos_Alpaca:0.65714000,Lama_glama_Llama:0.65714000):20.25989000,Camelus_dromedarius_Dromedary_camel:20.91703000):43.08297000,((((((Bos_grunniens_Yak:1.49662000,Bison_bison_Buffalo:1.49662000):2.80348000,Bos_taurus_Cow:4.30010000):17.32553000,(Capra_hircus_Goat:7.65408000,Ovis_aries_Sheep:7.65408000):13.97155000):2.06947000,(Alces_alces_Moose:10.99420000,Odocoileus_virginianus_White-tailed_deer:10.99420000):12.70090000):3.05625000,Giraffa_reticulata_Giraffe:26.75135000):35.09130000,Sus_scrofa_Pig:61.84265000):2.15735000):12.00000000):5.02605000,Desmodus_rotundus_Common_vampire_bat:81.02605000):12.97395000,((Oryctolagus_cuniculus_European_rabbit:78.97061000,((Tamias_striatus_Eastern_chipmunk:34.46259000,Sciurus_vulgaris_Eurasian_red_squirrel:34.46259000):35.73991000,((Rattus_norvegicus_Brown_rat:11.64917000,Mus_musculus_domesticus_House_mouse:11.64917000):58.26208000,Cavia_porcellus_Guinea_pig:69.91125000):0.29125000):8.76811000):8.22939000,(((Gorilla_beringei_Eastern_gorilla:8.60000000,((Homo_sapiens_Human:1.38948000,Homo_sapiens_subsp._Denisova:1.38948000):5.01052000,Pan_troglodytes_troglodytes_Central_chimpanzee:6.40000000):2.20000000):6.60000000,Pongo_pygmaeus_Bornean_orangutan:15.20000000):13.62000000,(Papio_hamadryas_Hamadryas_baboon:10.45400000,Macaca_mulatta_brevicaudus_Pigtail_macaque:10.45400000):18.36600000):58.38000000):6.80000000):5.18870000,((Trichechus_manatus_Manatee:60.77500000,Loxodonta_africana_African_elephant:60.77500000):36.04420000,Bradypus_variegatus_Three-toed_sloth:96.81920000):2.36950000):60.81130000):20.06610000,(Tachyglossus_aculeatus:46.72840000,Ornithorhynchus_anatinus_Platypus:46.72840000):133.33770000):138.88390000,(Anolis_carolinensis_Green_anole:279.83150000,Gallus_gallus_Chicken:279.83150000):39.11850000);" ;
  var outgroup = ['Anolis_carolinensis_Green_anole', 'Gallus_gallus_Chicken'] ;
}else{
  var display_names = ['African bush elephant, Loxodonta africana','African forest elephant, Loxodonta cyclotis','African wild dog, Lycaon pictus','American black bear, Ursus americanus','Arctic fox, Vulpes lagopus','Arctic hare, Lepus arcticus','Armadillo, Dasypus novemcinctus','Asian elephant, Elephas maximus','Baboon, Papio','Badger, Meles meles','Banded mongoose, Mungos mungo','Beaver, Castor canadensis','Black rhinoceros, Diceros bicornis','Blue whale, Balaenoptera musculus','Bonobo, Pan paniscus','Brown bear, Ursus arctos','Brown rat, Rattus norvegicus','Camel, Camelus bactrianus','Capybara, Hydrochoerus hydrochaeris','Cheetah, Acinonyx jubatus','Chimpanzee, Pan troglodytes','Common dolphin, Delphinus delphis','Cougar, Puma concolor','Coyote, Canis latrans','Dama gazelle, Nanger dama','Dingo, Canis lupus dingo','Domestic cat, Felis catus','Domestic cow, Bos taurus','Domestic pig, Sus scrofa domesticus','Domestic sheep, Ovis aries','Dugong, Dugong dugon','Eastern gray squirrel, Sciurus carolinensis','Echidna, Tachyglossus aculeatus','Elephant seal, Mirounga','Elk, Cervus canadensis','European hare, Lepus europaeus','European otter, Lutra lutra','Fallow deer, Dama dama','Ferret, Mustela putorius furo','Fin whale, Balaenoptera physalus','Fox, Vulpes','Giraffe, Giraffa camelopardalis','Gnu, Connochaetes','Golden jackal, Canis aureus','Gorilla, Gorilla','Gray fox, Urocyon cinereoargenteus','Gray seal, Halichoerus grypus','Gray wolf, Canis','Groundhog, Marmota monax','Hare, Lepus','Harbor seal, Phoca vitulina','Hippopotamus, Hippopotamus amphibius','Honey badger, Mellivora capensis','Horse, Equus caballus','House mouse, Mus musculus','Human, Homo sapiens','Humpback whale, Megaptera novaeangliae','Jaguar, Panthera onca','Kangaroo, Macropus','Koala, Phascolarctos cinereus','Leopard, Panthera pardus','Lion, Panthera leo','Little brown bat, Myotis lucifugus','Lynx, Lynx','Manatee, Trichechus','Marmot, Marmota','Meerkat, Suricata suricatta','Minke whale, Balaenoptera acutorostrata','Moose, Alces alces','Mountain goat, Oreamnos americanus','Mountain lion, Puma concolor','Musk ox, Ovibos moschatus','Nutria, Myocastor coypus','Ocelot, Leopardus pardalis','Orangutan, Pongo','Orca, Orcinus orca','Otter, Lutra','Pika, Ochotona','Pilot whale, Globicephala','Platypus, Ornithorhynchus anatinus','Polar bear, Ursus maritimus','Porcupine, Erethizon dorsatum','Prairie dog, Cynomys','Pronghorn, Antilocapra americana','Puma, Puma','Rabbit, Oryctolagus cuniculus','Raccoon, Procyon lotor','Red fox, Vulpes vulpes','Red kangaroo, Macropus rufus','Red panda, Ailurus fulgens','Red squirrel, Tamiasciurus hudsonicus','Reindeer, Rangifer tarandus','River dolphin, Platanista','Roe deer, Capreolus capreolus','Saiga antelope, Saiga tatarica','Sea otter, Enhydra lutris','Sheep, Ovis aries','Siberian tiger, Panthera tigris altaica','Skunk, Mephitis mephitis','Sloth, Bradypus','Snow leopard, Panthera uncia','Snowshoe hare, Lepus americanus','Spectacled bear, Tremarctos ornatus','Spotted hyena, Crocuta crocuta','Striped dolphin, Stenella coeruleoalba','Tasmanian devil, Sarcophilus harrisii','Tarsier, Tarsius','Tasmanian devil, Sarcophilus harrisii','Tiger, Panthera tigris','Walrus, Odobenus rosmarus','Warthog, Phacochoerus africanus','Water buffalo, Bubalus bubalis','Weasel, Mustela','Wild boar, Sus scrofa','Wolverine, Gulo gulo','Wolf, Canis lupus','Wombat, Vombatus ursinus','Yak, Bos grunniens','Gerbal, Meriones unguiculatus','Marmoset, Callimico goeldii',];
  var leaf_names = ['loxodonta_africana','loxodonta_cyclotis','lycaon_pictus','ursus_americanus','vulpes_lagopus','lepus_arcticus','dasypus_novemcinctus','elephas_maximus','papio','meles_meles','mungos_mungo','castor_canadensis','diceros_bicornis','balaenoptera_musculus','pan_paniscus','ursus_arctos','rattus_norvegicus','camelus_bactrianus','hydrochoerus_hydrochaeris','acinonyx_jubatus','pan_troglodytes','delphinus_delphis','puma_concolor','canis_latrans','nanger_dama','canis_lupus_dingo','felis_catus','bos_taurus','sus_scrofa_domesticus','ovis_aries','dugong_dugon','sciurus_carolinensis','tachyglossus_aculeatus','mirounga','cervus_canadensis','lepus_europaeus','lutra_lutra','dama_dama','mustela_putorius_furo','balaenoptera_physalus','vulpes','giraffa_camelopardalis','connochaetes','canis_aureus','gorilla','urocyon_cinereoargenteus','halichoerus_grypus','canis','marmota_monax','lepus','phoca_vitulina','hippopotamus_amphibius','mellivora_capensis','equus_caballus','mus_musculus','homo_sapiens','megaptera_novaeangliae','panthera_onca','macropus','phascolarctos_cinereus','panthera_pardus','panthera_leo','myotis_lucifugus','lynx','trichechus','marmota','suricata_suricatta','balaenoptera_acutorostrata','alces_alces','oreamnos_americanus','puma_concolor','ovibos_moschatus','myocastor_coypus','leopardus_pardalis','pongo','orcinus_orca','lutra','ochotona','globicephala','ornithorhynchus_anatinus','ursus_maritimus','erethizon_dorsatum','cynomys','antilocapra_americana','puma','oryctolagus_cuniculus','procyon_lotor','vulpes_vulpes','macropus_rufus','ailurus_fulgens','tamiasciurus_hudsonicus','rangifer_tarandus','platanista','capreolus_capreolus','saiga_tatarica','enhydra_lutris','ovis_aries','panthera_tigris_altaica','mephitis_mephitis','bradypus','panthera_uncia','lepus_americanus','tremarctos_ornatus','crocuta_crocuta','stenella_coeruleoalba','sarcophilus_harrisii','tarsius','sarcophilus_harrisii','panthera_tigris','odobenus_rosmarus','phacochoerus_africanus','bubalus_bubalis','mustela','sus_scrofa','gulo_gulo','canis_lupus','vombatus_ursinus','bos_grunniens','meriones_unguiculatus','callimico_goeldii',];
  var newickTree = '((ornithorhynchus_anatinus:0.66537,tachyglossus_aculeatus:0.66537)1:1.35799,((((dasypus_novemcinctus:0.63559,bradypus_variegatus:0.63559)1:0.15218,(((loxodonta_africana:0.04242,loxodonta_cyclotis:0.04242)1:0.01194,elephas_maximus:0.05436)1:0.51318,(trichechus_manatus:0.34028,dugong_dugon:0.34028)1:0.22727)1:0.22022)1:0.01507,((((((lepus_europaeus:0.13071,((lepus_granatensis:0.00682,lepus_arcticus:0.00682)1:0.10287,lepus_americanus:0.10969)1:0.02102)1:0.17761,oryctolagus_cuniculus_algirus:0.30832)1:0.17479,ochotona_annectens:0.48312)1:0.17927,(((((mus_musculus_bactrianus:0.11927,rattus_norvegicus:0.11929)1:0.05684,meriones_unguiculatus:0.17611)1:0.36053,castor_canadensis:0.53668)1:0.0563,((myocastor_coypus:0.37074,erethizon_dorsatum:0.37073)1:0.0069,hydrochoerus_hydrochaeris:0.37762)1:0.21533)1:0.01482,((cynomys_gunnisoni:0.1778,(marmota_monax:0.06704,marmota_caligata:0.06701)1:0.11077)1:0.2431,(sciurus_carolinensis:0.22016,tamiasciurus_hudsonicus:0.22017)1:0.20076)1:0.18688)1:0.05459)1:0.03574,(((papio_ursinus:0.2964,((((pan_paniscus:0.03834,pan_troglodytes_ellioti:0.03833)1:0.05241,homo_sapiens:0.09075)1:0.02509,gorilla_beringei_graueri:0.11583)1:0.07775,pongo_pygmaeus:0.19358)1:0.10281)1:0.11253,callimico_goeldii:0.40892)1:0.19653,tarsius_sangirensis:0.60546)1:0.09267)1:0.05321,(((((((((((lutra_lutra:0.09875,enhydra_lutris:0.09876)1:0.06292,(mustela_putorius:0.00058,mustela_putorius_furo:0.00058)1:0.16108)1:0.02709,gulo_gulo:0.18876)1:0.01189,(mellivora_capensis:0.18926,meles_meles_arcalus:0.18926)1:0.01139)1:0.11831,procyon_lotor:0.31895)1:0.02841,(mephitis_mephitis:0.32797,ailurus_fulgens:0.32798)1:0.01939)1:0.04959,((((phoca_vitulina_stejnegeri:0.03419,halichoerus_grypus:0.0342)1:0.14265,mirounga_leonina:0.17685)1:0.08678,odobenus_rosmarus_divergens:0.26364)1:0.12426,(tremarctos_ornatus:0.18798,((ursus_maritimus:0.01521,ursus_arctos:0.01521)1:0.06303,ursus_americanus:0.07824)1:0.10974)1:0.19991)1:0.00907)1:0.06483,((((vulpes_cana:0.03974,vulpes_vulpes:0.03974)1:0.07903,vulpes_lagopus:0.11876)1:0.13505,urocyon_cinereoargenteus:0.25381)1:0.01615,(((canis_lupus_dingo:0.06165,canis_aureus:0.06164)1:0.02692,canis_latrans:0.08856)1:0.07999,lycaon_pictus:0.16856)1:0.10141)1:0.19182)1:0.0555,(((suricata_suricatta:0.09665,mungos_mungo:0.09666)1:0.18939,crocuta_crocuta:0.28603)1:0.07103,(((felis_catus:0.1609,((acinonyx_jubatus:0.1039,puma_concolor_couguar:0.10391)1:0.02467,lynx_pardinus:0.12857)1:0.03232)1:0.01657,leopardus_pardalis:0.17748)1:0.0213,((((panthera_pardus_orientalis:0.05997,panthera_leo_persica:0.05997)1:0.01439,panthera_uncia:0.07436)1:0.01011,panthera_onca:0.08447)1:0.01861,(panthera_tigris_sumatrae:0.00304,panthera_tigris_altaica:0.00305)1:0.10002)1:0.09571)1:0.15828)1:0.16023)1:0.14929,((equus_caballus:0.55714,diceros_bicornis:0.55714)1:0.09543,((((((((orcinus_orca:0.08043,globicephala_macrorhynchus:0.08044)1:0.00392,(delphinus_delphis:0.02411,stenella_coeruleoalba:0.02411)1:0.06025)1:0.21727,platanista_minor:0.30163)1:0.03418,(((megaptera_novaeangliae:0.11358,balaenoptera_physalus:0.11358)1:0.04862,balaenoptera_musculus:0.1622)1:0.02648,balaenoptera_acutorostrata:0.18868)1:0.14714)1:0.1455,hippopotamus_amphibius:0.48131)1:0.02755,((((((((oreamnos_americanus:0.11429,ovis_aries_musimon:0.1143)1:0.01394,ovibos_moschatus:0.12824)1:0.0437,connochaetes_taurinus:0.17193)1:0.02463,(nanger_dama_mhorr:0.12451,saiga_tatarica:0.12451)1:0.07205)1:0.04142,((bos_grunniens:0.07403,bos_taurus:0.07403)1:0.08911,bubalus_bubalis:0.16314)1:0.07485)1:0.03166,(((capreolus_capreolus:0.15576,alces_alces:0.15576)1:0.01097,rangifer_tarandus:0.16672)1:0.01994,(cervus_canadensis_songaricus:0.10762,dama_dama:0.1076)1:0.07906)1:0.08299)1:0.01911,giraffa_camelopardalis_antiquorum:0.28875)1:0.02241,antilocapra_americana_sonoriensis:0.31117)1:0.19769)1:0.0414,((sus_scrofa_domesticus:0.0266,sus_scrofa_taiwanensis:0.0266)1:0.14113,phacochoerus_africanus:0.16773)1:0.38253)1:0.02876,camelus_bactrianus:0.57903)1:0.07355)1:0.01401)1:0.034,myotis_lucifugus_relictus:0.70058)1:0.05075)1:0.05151)1:0.6155,(((phascolarctos_cinereus:0.28822,vombatus_ursinus:0.28822)1:0.08491,(macropus_rufogriseus_banksianus:0.09039,macropus_rufus:0.09039)1:0.28273)1:0.04429,sarcophilus_harrisii:0.41741)1:1.00092)1:0.60502);';

  var outgroup = ['ornithorhynchus_anatinus', 'tachyglossus_aculeatus']
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
var taxa = getNodeIds( parse( newickTree ) ) ; 

/// randomly select a taxon from the list
function replaceRandomElement ( array ) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex] ;
}

/// set target here an dmake sure it's not an outgroup
var target = replaceRandomElement( taxa ) ; 
while ( outgroup.includes( target ) ) {
  target = replaceRandomElement( taxa ) ;
}

/// then replace the target in the tree
var newick = newickTree.replace( target, "Target");



/// store as a useful tree object
/// should just make a list of node ids for taxa here to simplify/edce code duplication
jsonTree = setNodeIDs( parse( newick ) ) ;
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

/// then put target into the existing guess list
var guesses = ["Target"] ; 
guesses = guesses.concat( outgroup ) ;

/// parsing function to create useful representation of newick
var node_num = 0 ; 
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

/// get the path to Target node
const targetNode = findLeafNode( jsonTree, "Target" ) ;
const pathToTarget = findPathToNode( jsonTree, targetNode ) ;
console.log(jsonTree) ; 
sortTree(jsonTree, pathToTarget) ; 
console.log(jsonTree) ; 

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


// Set which list we use in the drop down menu
var search_source = taxa
if (!use_tree_names) {
  search_source = display_names
}





/// main interactive elements 
$("#taxonInput").autocomplete({
    source: search_source
  });

  // add click listener to the "Add taxon" button
  $("#addItemButton").click(function() {
    // get the value of the item input field
    
    var selectedTaxon = $("#taxonInput").val();

    if (!use_tree_names){
      var display_name_of_selected_taxon = $("#taxonInput").val()
      var latin_name_of_selected_taxon   = leaf_names[display_names.indexOf(display_name_of_selected_taxon)]

      selectedTaxon = latin_name_of_selected_taxon
    }

    // add the selected item to the selected items list we display and to one we are keeping
    if (selectedTaxon !== "") {

      $("#selectedItemsList").append("<li>" + selectedTaxon + "</li>"); //deprecated?
      guesses.push(selectedTaxon) ; 


      /// prune the list of selected taxa from the newick
      /// probably could do this only once as long as we deep copy the tree object
      const parsedTree = structuredClone( jsonTree ) ; 
      var prunedTree = filter(parsedTree, guesses); 
      var prunedNewick = toNewick( prunedTree ) + ";" ; 

      // clear the previous tree
      document.getElementById("tree_display").innerHTML = "" ;

      // should be some kind of real celebration
      replaceID = "Target" ; 
      if ( selectedTaxon == target ) {
          replaceID = target ;
          rhinoDiv.style.display = "block" ;
          var tweet = document.getElementById("tweetButton") ; 
          tweet.style.display="block" ;
      }
      
      //// but also what we do if we don't have it
      else {
          //var distance = findDistance( prunedTree, "Target", selectedTaxon ) ; 
          prunedNewick = prunedNewick.replace(selectedTaxon,"last_guess") ; 
          /// this works for getting dstances
          
      }

      var tree_styles = {
        // set colour, shape and label for last guess and target. 
        last_guess: { fillColour: "blue", label: selectedTaxon, shape: phylocanvas.Shapes.Star },
        Target: { fillColour: "red", label: replaceID, shape: phylocanvas.Shapes.Star },
      }
      
      if (!use_tree_names){
        tree_styles['last_guess'].label = display_name_of_selected_taxon
        for(let i = 1; i < guesses.length; i++){
          var disp_name = display_names[leaf_names.indexOf(guesses[i])]
          tree_styles[guesses[i]] = {label:disp_name}
        }
      }

      /// now render this. 
      const tree = new phylocanvas.PhylocanvasGL(
        document.querySelector("#tree_display"),
        {
            styles: tree_styles, 
            // height function is junk if guessed right becuase the height gets larger 
            size: { width: 1200 , height: guesses.length*35},
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

/// 
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

/// to be updated with a score and a more subversive message
/// probably should have the button appear after the user finishes. 
function tweet() {
  var guess_total = guesses.length ; 
  guess_total -= 3 ; 
  var text = "I blew my mind and scored a " + guess_total + " on Phylo-Le" ; 
  var url = encodeURIComponent("https://www.Phylo-Le.com"); 
  var tweetUrl = "https://twitter.com/intent/tweet?text=" + text + "&url=" + url;
  window.open(tweetUrl);
}