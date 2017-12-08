var map = {
    '0': "o",
    '1': "i",
    '2': "abc",
    '3': "def",
    '4': "ghi",
    '5': "jkl",
    '6': "mno",
    '7': "pqrs",
    '8': "tuv",
    '9': "wxyz"
};

function telephoneWords(num, map, idx=0, str='', arr=[]) {
    if (str.length === 7) {
        arr.push(str);
    }
    else {
        var letters = map[num[idx]];
        for (var i=0, len = letters.length; i !== len; i++) {
            telephoneWords(num, map, idx+1, str + letters[i], arr);
        }
    }
    return arr;
}

let words = telephoneWords('8182612', map);
console.log(words);
console.log(words.length);
