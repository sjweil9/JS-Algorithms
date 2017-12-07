class Node {
    constructor(val) {
        this.val = val;
        this.children = [];
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

var subs = substrings('abcd');

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

console.log(subs);
console.log(get_dupes(subs));