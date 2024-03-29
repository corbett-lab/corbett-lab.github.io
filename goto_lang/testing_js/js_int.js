const fs = require('fs');
let script = fs.readFileSync(process.argv[2], 'utf-8').split('\n');
script = "\ngoto put_68\ngoto put_65\ngoto put_6c\ngoto put_6c\ngoto put_6f\ngoto getc\ngoto put_20\ngoto put_77\ngoto put_6f\ngoto put_72\ngoto put_6c\ngoto put_64\ngoto put_21".split('\n');
let ogScript = [];
let offsetStack = [0];
let addressStack = [0];

function pop(arr) {
  const ans = arr.pop();
  if (arr.length < 1) {
    arr = [0];
  }
  return [arr, ans];
}



let i = 0
function getChar() {
  const fake_input = "00000000000000000000000000000000000010++++++++++++++++++++++"
  if(i >= fake_input.length){
    process.exit()
  }

  let ans = fake_input[i]
  i+=1
  return ans
  
  //let buffer = Buffer.alloc(1)
  //fs.readSync(0, buffer, 0, 1)
  //return buffer.toString('utf8')
}




function printError(type, lineNumber, message) {
  console.log(`Error on line ${lineNumber}`);
  console.log(`${lineNumber}: ${ogScript[lineNumber]}`);
  console.log(`${type} Error: ${message}`);
  process.exit();
}

function isSignedInteger(str) {
  // Regular expression to match signed integers
  var regex = /^[-+]?[0-9]+$/;
  return regex.test(str);
}

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
      } else {
        printError("Syntax", L, "Not a goto statement or label declaration.");
      }
    } else {
      script[L] = script[L][1];
    }
  } else if (script[L].length > 2) { // Bad line
    if (script[L].slice(-1)[0].slice(-1) === ':') {
      printError("Syntax", L, "Label names cannot contain spaces");
    } else {
      printError("Syntax", L, "Not a goto statement or label declaration.");
    }
  } else if (script[L].length === 1) { // Potential label declaration
    if (script[L][0].slice(-1) !== ':') {
      printError("Syntax", L, `Missing colon after label declaration.\n\tPerhaps you meant '${script[L][0]}:'\n`);
    }
    if (script[L][0].length === 1) {
      printError("Syntax", L, "Labels must have a name\n");
    }
    script[L][0] = script[L][0].slice(0, -1); // Remove colon
    if (labelsToAddresses.hasOwnProperty(script[L][0])) {
      printError("Label", L, `Redeclaration of label '${script[L][0]}'. Already declared on line ${labelsToAddresses[script[L][0]]}`);
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



let haveToPush = new Array(script.length).fill(false);

// Remove and replace labels, replace jumps with absolute addresses
script.forEach((line, L) => {
  if (line && line[0] === ':') { // Check for offset
    if (labelsToAddresses.hasOwnProperty(line.slice(1))) { // Check if label
      script[L] = ':' + labelsToAddresses[line.slice(1)].toString();
      haveToPush[L] = true;
    } else if (line.slice(1) && (line[1] === '-' || line[1] === '+')) { // Check if it's a jump
      if (!/^-?\d+$/.test(line.slice(2))) {
        printError("Syntax", L, "Only an integer can follow a '-' or '+'");
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

let L = 1;
let running = true;

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
      process.exit();
      break;
    case "getc":
      const inp = getChar().charCodeAt(0)
      offsetStack.push(inp);
      return O + L + 1;
    case '<':
      [offsetStack, hold] = pop(offsetStack)
      offsetStack[offsetStack.length - 1] += hold
      return O + L + 1
    default:
      if (label.startsWith("put_") && label.length === 6) {
        const hexs = [label[4], label[5]].map(h => parseInt(h, 16));
        const char = String.fromCharCode(hexs[0] * 16 + hexs[1]);
        process.stdout.write(char);
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
    }
  }

  printError("Label", L, "This label was not declared");

}

while(true) {
  //console.log(offsetStack, addressStack, ogScript[L])
  L = goto(L, script[L])

  if(L < 0){
    L = 0
  }

  if( L >= script.length){
    process.exit()
  }

}

















