
//Left text field is source code
//Right text field is the 'terminal'

var buffer = ""



document.getElementById('right-text').addEventListener('paste', function(event) {
  
  event.preventDefault();
  let paste = (event.clipboardData || window.clipboardData).getData("text");
  console.log(paste)

  if (running && waiting_for_input && paste.length > 0) {
    offsetStack.push(paste.charCodeAt(0))
    waiting_for_input = false;
    buffer += paste.substring(1,paste.length)
    main_loop()
  }else{
    buffer += paste
  }
  
});

document.getElementById('right-text').addEventListener('keydown', function(event) {
  if (event.key === 'Backspace' || event.key === 'Delete') {
    event.preventDefault();
  }
});

document.getElementById('right-text').addEventListener('keypress', function(event) {

  
  var asciiCode = 0;
  if(event.key.length == 1){
    asciiCode = event.key.charCodeAt(0)
  }else if(event.key == "Enter"){
    asciiCode = 10
  }

  console.log(asciiCode)

  event.preventDefault();
  if (running && waiting_for_input) {
    offsetStack.push(asciiCode)
    waiting_for_input = false;
    main_loop()
  }
});



let script = "\ngoto put_68\ngoto put_65\ngoto put_6c\ngoto put_6c\ngoto put_6f\ngoto getc\ngoto put_20\ngoto put_77\ngoto put_6f\ngoto put_72\ngoto put_6c\ngoto put_64\ngoto put_21".split('\n');
let ogScript = [];
let offsetStack = [0];
let addressStack = [0];
let haveToPush;

let running = true;
let waiting_for_input = false;

var terminal = document.getElementById("right-text");

let PreGetchBox = ""
let L = 1;

function main_loop() {
  while(running && !waiting_for_input) {
    //console.log(offsetStack, addressStack, ogScript[L])
    L = goto(L, script[L])
    
    if(L < 0){
      L = 0
    }
    
    if( L >= script.length){
      break;
    }
  }
}

document.getElementById('run-button').addEventListener('click', function() {
    // Function to be called when the "Run" button is clicked

    document.getElementById('right-text').value = ""
    var leftTextFieldValue = document.getElementById('left-text').value;

    script = leftTextFieldValue.split('\n');

    ogScript = [];
    offsetStack = [0];
    addressStack = [0];
    L = 1;
    
    running = true
    waiting_for_input = false
    i = 0
    buffer = ""


    ParseScript();

    main_loop();
});






function pop(arr) {
  const ans = arr.pop();
  if (arr.length < 1) {
    arr = [0];
  }
  return [arr, ans];
}



function getChar() {

}

function gotChar() {

}




function printError(type, lineNumber, message) {
  Error_msg = "Error on line "+lineNumber+"\n"+lineNumber+": "+ogScript[lineNumber]+"\n"+type+" Error: "+message+"\n"
  alert(Error_msg)
  running = false
}

function isSignedInteger(str) {
  // Regular expression to match signed integers
  var regex = /^[-+]?[0-9]+$/;
  return regex.test(str);
}











function ParseScript(){

    // First step is to remove comments
    ogScript = Array.from(script);
    script = script.map(line => {
    const ind = line.indexOf('//');
    return ind >= 0 ? line.slice(0, ind) : line;
    });

    let labelsToAddresses = {};

    // Search for labels and check for syntax
    script.forEach((line, L) => {
        script[L] = line.trim().split(' ');
    if (script[L].length === 0 || (script[L].length === 1 &&  script[L][0].length ===0)) {
        script[L] = "";
    } else if (script[L].length === 2) { // Potential goto statement
        if (script[L][0] !== "goto") {
        if (script[L][1].slice(-1) === ':') {
            printError("Syntax", L, "Label names cannot contain spaces");
            return
        } else {
            printError("Syntax", L, "Not a goto statement or label declaration.");
            return
        }
        } else {
        script[L] = script[L][1];
        }
    } else if (script[L].length > 2) { // Bad line
        if (script[L].slice(-1)[0].slice(-1) === ':') {
            printError("Syntax", L, "Label names cannot contain spaces");
            return
        } else {
            printError("Syntax", L, "Not a goto statement or label declaration.");
            return
        }
    } else if (script[L].length === 1) { // Potential label declaration
        if (script[L][0].slice(-1) !== ':') {
        printError("Syntax", L, `Missing colon after label declaration.\n\tPerhaps you meant '${script[L][0]}:'\n`);
        return
        }
        if (script[L][0].length === 1) {
        printError("Syntax", L, "Labels must have a name\n");
        return
        }
        script[L][0] = script[L][0].slice(0, -1); // Remove colon
        if (labelsToAddresses.hasOwnProperty(script[L][0])) {
        printError("Label", L, `Redeclaration of label '${script[L][0]}'. Already declared on line ${labelsToAddresses[script[L][0]]}`);
        return
        }
        labelsToAddresses[script[L][0]] = L;
        if (script[L][0] === "back") {
        addressStack[addressStack.length - 1] = L;
        }
        script[L] = "";
    }
    });
    if (labelsToAddresses.hasOwnProperty("back")) {
      delete labelsToAddresses["back"];
    }



    haveToPush = new Array(script.length).fill(false);

    // Remove and replace labels, replace jumps with absolute addresses
    script.forEach((line, L) => {
    if (line && line[0] === ':') { // Check for offset
        if (labelsToAddresses.hasOwnProperty(line.slice(1))) { // Check if label
        script[L] = ':' + labelsToAddresses[line.slice(1)].toString();
        haveToPush[L] = true;
        } else if (line.slice(1) && (line[1] === '-' || line[1] === '+')) { // Check if it's a jump
        if (!/^-?\d+$/.test(line.slice(2))) {
            printError("Syntax", L, "Only an integer can follow a '-' or '+'");
            return
        }
        const N = parseInt(line.slice(1), 10);
        script[L] = ':' + (L + N).toString();
        }
    } else if (line && (line[0] === '-' || line[0] === '+')) { // Check for jump
        const N = parseInt(line, 10);
        script[L] = L + N;
    } else if (/^\d+$/.test(line)) { // Check for line number
        const N = parseInt(line, 10);
        script[L] = N;
    } else if (labelsToAddresses.hasOwnProperty(line)) { // Check for label to replace
        script[L] = labelsToAddresses[line];
        haveToPush[L] = true;
    } else if (line && line[0] === '=' && line.slice(1)) {
        if (labelsToAddresses.hasOwnProperty(line.slice(1))) { // Check for label to replace
        script[L] = '=' + labelsToAddresses[line.slice(1)].toString();
        }
    }
    });
}


function goto(L, label) {
  let O = 0;
  if (typeof label === 'number') { // Handle precomputed jumps
    if (haveToPush[L]) {
      addressStack.push(L + 1);
      offsetStack.push(0);
    }
    return label;
  }
  if (label.length === 0) { // Handle empty lines
    return L + 1;
  }
  if (label[0] === ':') { // Add offset and remove colon
    O = offsetStack[offsetStack.length - 1];
    label = label.substring(1, label.length);
  }
  if (isSignedInteger(label)) { // Handle offset declared labels, jumps, and absolute numeral labels
    if (haveToPush[L]) {
      addressStack.push(L + 1);
      offsetStack.push(0);
    }
    label = parseInt(label)
    return O + label;
  }
  switch (label) {
    case "back":
      [addressStack, address] = pop(addressStack);
      return O + address;
    case "next":
      addressStack.push(L + 1);
      offsetStack.push(0);
      return O + L + 1;
    case "end":
      running = false
      break;
    case "getc":
      if(buffer.length >= 1){
        offsetStack.push(buffer.charCodeAt(0))
        buffer = buffer.substring(1, buffer.length);
      }else{
        waiting_for_input = true
      }
      console.log("wait")
      console.log(waiting_for_input)
      return O + L + 1;
    case '<':
      [offsetStack, hold] = pop(offsetStack)
      offsetStack[offsetStack.length - 1] += hold
      return O + L + 1
    default:
      if (label.startsWith("put_") && label.length === 6) {
        const hexs = [label[4], label[5]].map(h => parseInt(h, 16));
        const char = String.fromCharCode(hexs[0] * 16 + hexs[1]);
        terminal.value += char
        return O + L + 1;
      }
    
  }

  if(label[0] == '='){
    let hold = label.substring(1,label.length)
    if(isSignedInteger(hold) ){
      offsetStack[offsetStack.length - 1] = parseInt(hold, 10);
      return O + L + 1;
    }else{
      printError("Syntax",L,"Expected an integer after '='. Got this bullshit instead: " + hold)
      return
    }
  }

  printError("Label", L, "This label was not declared");
}


