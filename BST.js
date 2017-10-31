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
test_BT.add_node(4).add_node(3).add_node(5).add_node(3).add_node(12).add_node(8);
console.log(test_BT.min());
console.log(test_BT.max());
console.log(test_BT.count());
console.log(test_BT.contains(3));
console.log(test_BT.contains(35));
const test_BT2 = new BST();
console.log(test_BT2.count());
