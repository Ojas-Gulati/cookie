// JavaScript source code
var fs = require('fs');
var program = fs.readFileSync('program.txt', 'utf8');
var args = fs.readFileSync('args.txt', 'utf8');
var prog = program.split('');

var d = 0;
var sp = 0;
var other = [];
var paren = [];
var netparen = 0;
var stack = [];
var temp = [];
var tempstacks = [];
var pickup;


run(stack);



function run(stack) {
    d++;



    var vars = [null, null, null, null, null, null, null, null, null]
    for (var n = 0; n < prog.length; n++) {
        if (prog[n] == 'w') {
            while ((!(prog[n + 1] == '"')) || (!(prog[n + 1] == "'"))) {
                if (prog[n] == "'") { break; }
                if (prog[n] == '"') { break; }
                if (prog[n] == 'ŕ') {
                    prog[n] = args;
                }
                if (prog[n] == "[") {
                    console.log(prog);
                    prog.splice(n, 1);

                    while (1 == 1) {
                        console.log(prog);
                        if (prog[n] == "\\") {
                            temp.push(prog[n + 1]);
                            n++;
                            n++;
                            
                        }
                        if (prog[n] == "]") {

                            prog[n] = eval(temp.join(""));
                            break;
                        } else {
                            if (prog[n] == "r") {
                                prog[n] = args;
                                console.log("beep");
                                console.log(prog);

                            }

                            temp.push(prog[n]);
                            prog.splice(n, 1);
                            //n++;
                        }
                        if (prog[n] == "{") {
                            temp.pop();
                            break;
                        }
                        if (prog[n] == "[") {
                            temp.pop();
                            break;
                        }

                        //console.log(prog[i]);
                        //n++;
                    }

                }
                //console.log(prog[i + 1]);
                //temp.push(prog[i + 1]);
                n++;

            }
            n++;
        }

        if (prog[n] == 'r') {
            prog[n] = args;
        }


    }



    for (var i = 0; i < prog.length; i++) {
        switch (prog[i]) {
            
            case "[":
                temp = [];
                console.log(prog);
                prog.splice(i, 1);

                while (1 == 1) {
                    console.log(prog);
                    if (prog[i] == "]") {

                        prog[i] = eval(temp.join(""));
                        prog.splice(i, 1);
                        stack[sp] = eval(temp.join(""));
                        break;
                    } else {
                        if (prog[i] == "r") {
                            prog[i] = args;
                            console.log("beep");
                            console.log(prog);

                        }

                        temp.push(prog[i]);
                        prog.splice(i, 1);
                        //n++;
                    }
                    if (prog[i] == "{") {
                        temp.pop();
                        break;
                    }
                    if (prog[i] == "[") {
                        temp.pop();
                        break;
                    }

                    //console.log(prog[i]);
                    //n++;
                }
                break;
            case "ȑ":
                stack[sp] = args;
                break;
            case "w":
                temp = [];
                console.log(prog);
                while (1 == 1) {
                    if (prog[i] == "'") { break; }
                    if (prog[i] == '"') { break; }
                    if (prog[i] == "\\") {
                        i++;
                        temp.push(prog[i] + 1);
                        continue;
                    }
                    //if (prog[i] == '🕂') { }
                    console.log(prog[i + 1]);
                    temp.push(prog[i + 1]);
                    i++;

                }
                //i++;
                //console.log(i);
                temp.pop();
                console.log("hi");
                console.log(temp);
                other.push(temp.join(''));
                temp = [];
                break;
            case "ŧ":
                i++;
                while (1 == 1) {
                    if (prog[i] == "}") {
                        break;
                    } else {
                        temp.push(prog[i])
                    }
                    if (prog[i] == "{") {
                        temp.pop();
                        break;
                    }
                    if (prog[i] == "[") {
                        temp.pop();
                        break;
                    }

                    //console.log(prog[i]);
                    i++;
                }
                stack[sp] = thuemorse(numberify(temp.join("")));
                //console.log("hello")
                //console.log(numberify(temp.join("")));
                break;
            case "!":


                //console.log(newarr);
                stack[sp] = negate(stack[sp]);

                break;
            default:
                break;
        }

    }
    d--;
    console.log("Other: " + other)

    console.log("Parsed program: " + prog);

    console.log("Stack: " + stack);


    console.log("Program: " + program);
}
var write;
if (stack[sp] == undefined) {
    write = other.join('');
} else {
    write = other.join('').concat(String(stack[sp]));
}
console.log("Output: " + write);

fs.writeFileSync('output.txt', write, 'utf8');

function checkNum(value) {
    if (+value % 1 === 0 && !value == ' ')
        return true;
    else
        return false;
}

function isPrime(value) {
    for (var i = 2; i < value; i++) {
        if (value % i === 0) {
            return false;
        }
    }
    return value > 1;
}

function numberify(array) {
    var convertedArray = [];
    for (var i = 0; i < array.length; ++i) {
        convertedArray.push(array[i]);
    }



    return +convertedArray.join("");
}

function thuemorse(iteration) {
    var int = "0";
    for (var i = 0; i < iteration; i++) {
        int = int.concat(negate(int));
    }
    return int;
}

function negate(value) {
    var g = value.toString().split("");
    var newarr = [];
    //console.log(g);

    for (var h = 0; h < g.length; h++) {
        if (g[h] == "0") {
            newarr.push("1");
        }
        if (g[h] == "1") {
            newarr.push("0");
        }

    }
    //console.log(newarr);
    return newarr.join("");
}