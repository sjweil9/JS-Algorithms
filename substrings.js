var now = require("performance-now");

class Node {
    constructor(val) {
        this.val = val;
        this.children = [];
    }
}

function subs2(str, arr=['']) {
    for (var k=0, len=str.length; k !== len; k++) {
        var root = new Node(str[k]);
        build_tree2(root, str, k+1);
        traverse_tree2(root, arr);
    }
    return arr;
}

function subs3(str, arr=[]) {
    var root = new Node(str[0]);
    build_tree2(root, str, 1);
    traverse_tree2(root, arr);
    for (var i=0, len=root.children.length; i !== len; i++) {
        traverse_tree2(root.children[i], arr);
    }
    return arr;
}

function build_tree2(node, str, idx) {
    for (var i=idx, len=str.length; i <= len; i++) {
        if (i === len) {
            node.children.push(new Node('end'));
        }
        else {
            node.children.push(new Node(str[i]));
            build_tree2(node.children[node.children.length-1], str, i+1);
        }
    }
    return node;
}

function traverse_tree2(node, arr, str='') {
    if (node.val === 'end') {
        arr.push(str);
        return arr;
    }
    for (var i=0, len=node.children.length; i !== len; i++) {
        traverse_tree2(node.children[i], arr, str + node.val);
    }
}


function substrings(str, arr=['']) {
    var root = new Node(str[0]);
    build_tree(root, str, 1);
    traverse_tree(root, arr);
    return arr;
}

function build_tree(node, str, idx) {
    for (var i=idx, len=str.length; i !== len; i++) {
        node.children.push(new Node(str[i]));
        if ((i+1) !== len) {
            build_tree(node.children[node.children.length-1], str, i+1);
        }
    }
    return node;
}

function traverse_tree(node, arr, paths={}, str='') {
    str += node.val;
    if (!paths[str]) {
        arr.push(str);
        paths[str] = true;
    }
    for (var i=0, len=node.children.length; i !== len; i++) {
        traverse_tree(node.children[i], arr, paths, str);
        traverse_tree(node.children[i], arr, paths);
    }
    return arr;
}

// this is just a check to make it easier to see if stuff is working

function get_dupes(arr) {
    var found = {};
    var dupes = {};
    for (var i=0; i < arr.length; i++) {
        if (!found[arr[i]]) {
            found[arr[i]] = true;
        }
        else {
            dupes[arr[i]] = true;
        }
    }
    return dupes;
}

var t0 = now();
var subs = substrings('a');
var t1 = now();
console.log(subs);
console.log(subs.length);
// console.log(get_dupes(subs));
console.log("Version 1 took " + (t1 - t0) + " milliseconds.");

// v1 cant handle past 19 characters (50 seconds)

t0 = now();
var other_subs = subs2('abcdefghijklmnopqrstuv');
t1 = now();
console.log(other_subs);
console.log(other_subs.length);
// console.log(get_dupes(other_subs));
console.log("Version 2 took " + (t1 - t0) + " milliseconds.");



// on strings of 4 characters or less, version 1 is marginally faster
// when strings get longer, version 2 becomes vastly superior

t0 = now();
var third_subs = subs3('abcdefghijklmnopqrstuv');
t1 = now();
console.log(third_subs);
console.log(third_subs.length);
// console.log(get_dupes(third_subs));
console.log("Version 3 took " + (t1 - t0) + " milliseconds.");

// version three uses caching, becomes quickly superior to v2
// overflows heap at 23 characters on MacOS High Sierra
// but does 22 characters in just under 4 seconds