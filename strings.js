function stringToWordArray(string) {
    var words = [];
    var current_word = '';
    for (let char of string) {
        if (char.match(/[a-zA-Z0-9']/)) {
            current_word += char;
        }
        // could re-write to have it check if symbol is followed by whitespace or a char
        else {
            if (current_word !== '') {
                words.push(current_word);
                current_word = '';
            }
            if (char !== ' ' && char !== '\n' && char !== '\t') {
                words.push(char);
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

console.log(reverseWords("Life's not a drill, go for it!"));