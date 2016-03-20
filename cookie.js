// JavaScript source code
var fs = require('fs');
var program = fs.readFileSync('program.txt', 'utf8');
var args = fs.readFileSync('args.txt', 'utf8');

var prog = program.split('');
var sp = 0;
var stack = ["0110"];
var temp = [];
var other = [];
var vars = [null, null, null, null, null, null, null, null, null]


for (var n = 0; n < prog.length; n++) {
    if (prog[n] == 'w') {
        while ((!(prog[n + 1] == '"')) || (!(prog[n + 1] == "'"))) {
            if (prog[n] == "'") { break; }
            if (prog[n] == '"') { break; }
            if (prog[n] == 'ᒦ') {
                prog[n] = args;
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
    if (prog[n] == "i") {
        prog[n] = "_";
        
    }

}



for (var i = 0; i < prog.length; i++) {
    
    console.log(stack);
    console.log(prog[i]);
    console.log(i);
    switch (prog[i]) {
        case "$":
            i++;
            while (checkNum(prog[i + 1])) {

                vars[+i] = prog[i + 1];
                i++;

            }
            break;
        case "ȑ":
            stack[sp] = args;
            break;
        case "+":
            if (prog[i + 1] == '{') {

            } else {
                var temp = '';
                while (isNumeric(prog[i + 1])) {
                    temp = temp.concat(prog[i + 1]);
                }
                var res = +temp;
                stack[sp] = stack[sp] + res;
                i++;
            }
            break;
        case "n":
            stack[sp] = +stack[sp];
            break;
        case "w":


            while ((!(prog[i + 1] == '"')) || (!(prog[i + 1] == "'"))) {
                if (prog[i] == "'") { break; }
                if (prog[i] == '"') { break; }
                //console.log(prog[i + 1]);
                temp.push(prog[i + 1]);
                i++;

            }
            //i++;
            //console.log(i);
            temp.pop();
            //console.log(temp);
            other.push(temp.join(''));
            temp = [];
            break;
        case "\\":
            stack[sp] = vars[+prog[i + 1]];
            //console.log(vars);
            i++;



            break;
        case " ":
            //console.log("space")
            sp++;
            stack.push(" ");

            break;
        case "|":



            stack[sp + 1] = stack[sp - 1].toString().concat(stack[sp].toString());


            sp++;

            break;

        case "a":
            vars[+prog[i + 1]] = stack[sp];
            i++;
            break;

        case "!":

            var g = stack[sp].toString().split("");
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
            stack[sp] = newarr.join("");

            break;


        case "p":
            stack[sp] = isPrime(+stack[sp]);
            break;

        case "s":

            break;
        default:
            break;

    }

}
var write;
if (stack[sp] == undefined) { var write = other.join(''); } else { write = other.join('').concat(String(stack[sp])); }


fs.writeFileSync('output.txt', write, 'utf8');

function checkNum(value) {
    if (+value % 1 === 0 && !value == ' ')
        return true;
    else
        return false;
}

function isPrime(value) {
    for(var i = 2; i < value; i++) {
        if(value % i === 0) {
            return false;
        }
    }
    return value > 1;
}