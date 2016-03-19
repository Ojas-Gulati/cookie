// JavaScript source code
var fs = require('fs');
var program = fs.readFileSync('program.txt', 'utf8');
var args = fs.readFileSync('args.txt', 'utf8');

var prog = program.split('');
var stack = "";
var temp = [];
var other = [];

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
    
}


for (var i = 0; i < prog.length; i++) {
    switch (prog[i]) {
        case "ȑ":
            stack = args;
            break;
        case "+":
            if (prog[i + 1] == '{') {

            } else {
                var temp = '';
                while (isNumeric(prog[i + 1])) {
                    temp = temp.concat(prog[i + 1]);
                }
                var res = +temp;
                stack = stack + res;
                i++;
            }
            break;
        case "n":
            stack = +stack;
            break;
        case "w":


            while ((!(prog[i + 1] == '"')) || (!(prog[i + 1] == "'"))) {
                if (prog[i] == "'") { break;}
                if (prog[i] == '"') { break;}
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

    }

}
var write = other.join('').concat(String(stack));

fs.writeFileSync('output.txt', write, 'utf8')

function isNumeric(num) {
    return !isNaN(num);
}