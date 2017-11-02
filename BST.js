class BST {
    constructor() {
        this.root = null;
        this.size = 0;
    }
    add_node(val) {
        this.size++;
        if (!this.root) {
            this.root = new BTNode(val);
        }
        var run = this.root;
        while (run) {
            if (val > run.val) {
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
            else {
                run.count++;
                break;
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
        return {'num': run.val, 'count': run.count};
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
        // intended to BUILD a BST out of a sorted array - return false if BST already exists
        if (this.root) {
            console.log("This tree already exists.");
            return false;
        }
        // below function is broken - stack call size exceeded
        function build(arr, start, end) {
            if (start > end) {
                return null;
            }
            var mid = Math.floor((start+(end-start))/2);
            var node = new BTNode(arr[mid]);
            node.left = build(arr, start, mid-1);
            node.right = build(arr, mid+1, end);
            return node;
        }
        this.root = build(array, 0, array.length-1);
    }
}

class BTNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
        this.count = 1;
    }
}

const test_BT = new BST();
test_BT.add_node(4).add_node(3).add_node(5).add_node(3).add_node(12).add_node(8).add_node(9);
console.log(test_BT.height());
console.log(test_BT.common_ancestor(9, 12));

/*
const test_BT2 = new BST();
test_BT2.add_sorted_array([0,0,1,2,3,4]);
console.log(test_BT2.height());

console.log(test_BT.min());
console.log(test_BT.max());
console.log(test_BT.count());
console.log(test_BT.contains(3));
console.log(test_BT.contains(35));
const test_BT2 = new BST();
console.log(test_BT2.count());
*/
