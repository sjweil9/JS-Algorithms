var now = require("performance-now");

function stringToWordArray(string) {
    var words = [];
    var current_word = '';
    for (var i=0, len=string.length; i !== len; i++) {
        if (string[i].match(/[a-zA-Z0-9]/) || ( (i+1) !== len && string[i].match(/[\s]/) === null && string[i+1].match(/[a-zA-Z0-9]/)) ) {
            current_word += string[i];
        }
        else {
            if (current_word !== '') {
                words.push(current_word);
                current_word = '';
            }
            if (string[i].match(/[\s]/) === null) {
                words.push(string[i]);
            }
        }
    }
    return words;
}

console.log(stringToWordArray("Life's not a drill!"));

function reverseWords(string) {
    // accounting for punctuation and capitalization
    // will leave mid-sentence punctuation in relative place
    // end of sentence punctuation will stay at end
    // first letter will be capitalized
    let reversed = "";
    let cur_word = string[0].toLowerCase();
    let alphanum = /[a-zA-Z0-9']/;
    for (let i=1, len=string.length; i !== len; i++) {
        if (string[i].match(alphanum) || (string[i].match(/[\s]/) === null && i+1 !== len && string[i+1].match(alphanum))) {
            cur_word += string[i];
            if (i+1 === len && cur_word !== "") {
                cur_word = capitalize(cur_word);
                reversed = cur_word + " " + reversed;
            }
        }
        else {
            if (cur_word !== "") {
                if (string[i].match(/[\s]/)) {
                    if (reversed === "") {
                        reversed = cur_word;
                    }
                    else if (reversed[0].match(alphanum) === null) {
                        reversed = cur_word + reversed;
                    }
                    else {
                        reversed = cur_word + " " + reversed;
                    }
                }
                else {
                    if (i+1 === len) {
                        cur_word = capitalize(cur_word);
                        reversed = cur_word + " " + reversed;
                        reversed += string[i];
                    }
                    else {
                        reversed = string[i] + " " + cur_word + " " + reversed;
                    }
                }
                cur_word = "";
            }
        }
    }
    return reversed;
}

function capitalize(word) {
    if (word.length === 0) {
        return word;
    }
    let first = word[0];
    let rest = "";
    for (let k=1, len2=word.length; k !== len2; k++) {
        rest += word[k];
    }
    return first.toUpperCase() + rest;
}

function rotate(string, num) {
    if (num === 0) {
        return string;
    }
    let rest = "";
    for (var i=0, len=string.length-1; i !== len; i++) {
        rest += string[i];
    }
    return rotate(string[len]+rest, num-1);
}

function dedupe(string, memo={}, idx=string.length-1) {
    if (idx === -1) {
        return string;
    }
    else if (!memo[string[idx]]) {
        memo[string[idx]] = true;
        return dedupe(string, memo, idx-1);
    }
    else {
        let fixed = "";
        for (let pos in string) {
            if (pos != idx) {
                fixed += string[pos];
            }
        }
        return dedupe(fixed, memo, idx-1);
    }
}

function dedupe2(string, memo={}, idx=string.length-1, fixed="") {
    // this is strictly better than first dedupe, also uses slightly less memory
    if (idx === -1) {
        return fixed;
    }
    else if (!memo[string[idx]]) {
        memo[string[idx]] = true;
        return dedupe2(string, memo, idx-1, string[idx]+fixed);
    }
    else {
        return dedupe2(string, memo, idx-1, fixed);
    }
}

function censor(string, words) {
    split = stringToWordArray(string);
    joined = "";
    for (let idx=0, len=split.length; idx !== len; idx++) {
        joined += check(split[idx], words);
        if (idx + 1 !== len && split[idx+1][0].match(/[a-zA-Z0-9]/)) {
            joined += " ";
        }
    }
    return joined;
}

function check(word, words, start=0) {
    let len = word.length;
    if (start === len) {
        return word;
    }
    let cleansed = "";
    for (let i=start; i !== len; i++) {
        cleansed += word[i];
        if (words.indexOf(cleansed) !== -1) {
            cleansed = "";
            for (var j=0; j !== start; j++) {
                cleansed += word[j];
            }
            for (j=-1; j !== (i-start); j++) {
                cleansed += "x";
            }
            for (j=i+1; j !== len; j++) {
                cleansed += word[j];
            }
            return check(cleansed, words, start+1);
        }
    }
    return check(word, words, start+1);
}

console.log(reverseWords("Life's not a drill, go for it!"));
console.log(reverseWords("Hey this is a test"));

console.log(rotate("Boris Godunov", 5));

var t0 = now();
console.log(dedupe("Snaps! crackles! pops!"));
var t1 = now();
console.log("Version 1 took " + (t1 - t0) + " milliseconds.");

t0 = now();
console.log(dedupe2("Snaps! crackles! pops!"));
t1 = now();
console.log("Version 2 took " + (t1 - t0) + " milliseconds.");

console.log(censor("Snap crackle pop nincompoopcracker!", ["crack", "poop"]));