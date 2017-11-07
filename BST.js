class BST {
    constructor() {
        this.root = null;
        this.size = 0;
    }
    add_node(val) {
        this.size++;
        if (!this.root) {
            this.root = new BTNode(val);
            return this;
        }
        var run = this.root;
        while (run) {
            if (val >= run.val) {
                if (run.right) {
                    run = run.right;
                }
                else {
                    run.right = new BTNode(val);
                    break;
                }
            }
            else if (val < run.val) {
                if (run.left) {
                    run = run.left;
                }
                else {
                    run.left = new BTNode(val);
                    break;
                }
            }
        }
        if (!run) {
            run = new BTNode(val);
        }
        return this;
    }
    min() {
        if (!this.root) {
            return null;
        }
        var run = this.root;
        while (run.left) {
            run = run.left;
        }
        return run.val;
    }
    max() {
        if (!this.root) {
            return null;
        }
        var run = this.root;
        while (run.right) {
            run = run.right;
        }
        return {'num': run.val, 'count': run.count};
    }
    count() {
        return this.size;
    }
    // this is unnecessary, but theoretical if BST def not include count
    /*
    size() {
        var size = 1;
        function count(node) {
            if (node) {
                size++;
                count(node.left);
                count(node.right);
            }
        }
        count(this.root);
        return this.root == null?0:size;
    }
    */
    isEmpty() {
        return this.root === null?true:false;
    }
    contains(val) {
        var ret = false;
        var run = this.root;
        while (run) {
            if (run.val === val) {
                ret = true;
                break;
            }
            else if (run.val > val) {
                run = run.left;
            }
            else {
                run = run.right;
            }
        }
        return ret;
    }
    height() {
        var height = 0;
        var current = 0;
        function count(node) {
            current++;
            if (node.left) {
                count(node.left);
            }
            if (node.right) {
                count(node.right);
            }
            if (!node.left && !node.right) {
                if (current > height) {
                    height = current;
                }
            }
            current--;
        }
        if (this.root) {
            count(this.root);
        }
        return height;
    }
    common_ancestor(val1, val2) {
        var ancestor = this.root.val;
        var values = [val1, val2];
        var runners = [this.root, this.root];
        while (runners[0] === runners[1]) {
            ancestor = runners[0].val;
            for (var idx in runners) {
                if (values[idx] < runners[idx].val) {
                    runners[idx] = runners[idx].left;
                }
                else if (values[idx] > runners[idx].val) {
                    runners[idx] = runners[idx].right;
                }
            }   
        }
        return ancestor;
    }
    add_sorted_array(array) {
        if (array.length < 1) {
            return null;
        }
        // intended to BUILD a BST out of a sorted array - return false if BST already exists
        if (this.root) {
            console.log("This tree already exists.");
            return false;
        }
        const start = 0;
        const end = array.length - 1;
        return build(array, start, end);

        function build(arr, start, end) {
            if (start > end) {
                return null;
            }
            const mid = Math.floor((end + start) / 2);
            var node = new BTNode(arr[mid]);
            if (start !== end) {
                node.left = build(arr, start, mid-1);
                node.right = build(arr, mid+1, end);
            }
            return node;
        }
    }
    is_balanced() {
        function node_balanced(node) {
            if (Math.abs(subtree_height(node.left) - subtree_height(node.right)) > 1) {
                return false;
            }
            if (node.left && !node_balanced(node.left)) {
                return false;
            }
            if (node.right && !node_balanced(node.right)) {
                return false;
            }
            return true;
        }
        function subtree_height(node) {
            if (node) {
                let left = subtree_height(node.left);
                let right = subtree_height(node.right);
                let bigger = left >= right?left:right;
                return 1 + bigger;
            }
            else {
                return 0;
            }
        }
        if (!this.root) {
            return true;
        }
        else {
            return node_balanced(this.root);
        }
    }
    in_order() {
        // returns an array of the BST values in ascending numerical order

        // get the absolute minimum of tree, and set cur_min to one less than it
        // so we keep looking for min (to account for situation where min has dupes)
        var cur_min = this.min()-1;
        var array = [];
        // check function will now be using cur_min as a reference to determine
        // what number to look for next
        function check(node) {
            // if looking at null, immediately stops (and goes back to last call)
            if (node) {
                // if there is a left node, must be smaller, but if
                // it's <= cur_min, we must have already added it
                if (node.left && node.left.val > cur_min) {
                    check(node.left);
                }
                // if node we are currently looking at is bigger than cur_min
                // i.e. not yet pushed in array, and has no left, it must be the
                // smallest remaining - push into array, and also change cur_min
                if (node.val > cur_min) {
                    cur_min = node.val;
                    // calls a helper function to look for duplicates, adds that many
                    // because the subsequent recursive calls to check(node.right) would have
                    // been skipped over (because their val would not be greater than cur_min)
                    let count = 1 + look_for_dupes(node);
                    for (let i = 0; i < count; i++) {
                        array.push(cur_min);
                    }
                    check(node.right);
                }
                else {
                    check(node.right);
                }
            }
        }
        function look_for_dupes(node) {
            if (node.right && node.val === node.right.val) {
                return 1 + look_for_dupes(node.right);
            }
            else {
                return 0;
            }
        }
        // start recursive loop - look at root, if null, will immediately stop
        check(this.root);
        return array;
    }
    add_array(arr) {
        for (var i=0; i<arr.length; i++) {
            this.add_node(arr[i]);
        }
        return this;
    }
    pre_order() {
        var arr = [];
        function traverse(node) {
            if (node) {
                arr.push(node.val);
                traverse(node.left);
                traverse(node.right);
            }
        }
        traverse(this.root);
        return arr;
    }
    post_order() {
        var arr = [];
        function traverse(node) {
            if (node) {
                traverse(node.left);
                traverse(node.right);
                arr.push(node.val);
            }
        }
        traverse(this.root);
        return arr;
    }
}

class BTNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

const test = new BST();
test.add_array([25, 15, 50, 10, 22, 35, 70, 4, 12, 18, 24, 31, 44, 66, 90]);
console.log(test.pre_order());
console.log(test.post_order());
console.log(test.in_order());




/*
const test_BT = new BST();
test_BT.add_node(4).add_node(3).add_node(5).add_node(2).add_node(1).add_node(9).add_node(-3).add_node(46).add_node(-14).add_node(0).add_node(3).add_node(26).add_node(3).add_node(3).add_node(3).add_node(3).add_node(3).add_node(3).add_node(3);
// console.log(test_BT.height());
// console.log(test_BT.is_balanced());
// console.log(test_BT.in_order());

const test_BT3 = new BST();
test_BT3.add_node(25).add_node(12).add_node(36).add_node(4).add_node(0).add_node(17);
console.log(test_BT3.in_order());

const test_BT2 = new BST();
test_BT2.root = test_BT2.add_sorted_array([0,0,1,2,3,4]);
// console.log(test_BT2.height());
// console.log(test_BT2.is_balanced());
// console.log(test_BT2.in_order());


/*
console.log(test_BT.min());
console.log(test_BT.max());
console.log(test_BT.count());
console.log(test_BT.contains(3));
console.log(test_BT.contains(35));
const test_BT2 = new BST();
console.log(test_BT2.count());
*/
