class SLL {
    constructor() {
        this.head = null;
    }
    add_front(value){
        var cur_head = this.head;
        this.head = new SLNode(value);
        this.head.next = cur_head;
        return this.head;
    }
    contains(value){
        var ret = false;
        var cur = this.head;
        while (cur) {
            if (cur.val == value) {
                ret = true;
                break;
            }
            cur = cur.next;
        }
        return ret;
    }
    remove_front(){
       if (!this.head){
           return null;
       }
       this.head = this.head.next;
       return this.head;
    }
    front(){
        if (!this.head){
            return null;
        }
        return this.head.val;
    }
    length(){
        if (!this.head){
            return null;
        }
        var count = 1;
        var cur = this.head.next;
        while (cur){
            count++;
            cur = cur.next;
        }
        return count;
    }
    display(){
        if (!this.head){
            return null;
        }
        var ret = "";
        var cur = this.head;
        while (cur){
            ret += cur.val;
            if (cur.next){
                ret += " , ";
            }
            cur = cur.next;
        }
        return ret;
    }
    max(){
        var max = this.head?this.head.val:null;
        var cur = this.head?this.head.next:null;
        while (cur){
            if (cur.val > max){
                max = cur.val;
            }
            cur = cur.next;
        }
        return max;
    }
    min(){
        var min = this.head?this.head.val:null;
        var cur = this.head?this.head.next:null;
        while (cur){
            if (cur.val < min){
                min = cur.val;
            }
            cur = cur.next;
        }
        return min;
    }
    avg(){
        if(!this.head){
            return null;
        }
        var count = 1;
        var sum = this.head.val;
        var cur = this.head.next;
        while (cur){
            count++;
            sum += cur.val;
            cur = cur.next;
        }
        return sum/count;
    }
    remove_back(){
        if(!this.head){
            return this;
        }
        else if(!this.head.next){
            this.head = null;
        }
        else{
            var cur = this.head;
            while(cur.next.next){
                cur = cur.next;
            }
            cur.next = null;
        }
        return this;
    }
    back(){
        if(!this.head){
            return this;
        }
        var cur = this.head;
        while(cur.next){
            cur = cur.next;
        }
        return cur;
    }
    min_to_front(){
        if(this.head && this.head.next){
            var point = null;
            var min = this.head.val;
            var cur = this.head;
            while(cur.next){
                if(cur.next.val < min){
                    min = cur.next.val;
                    point = cur;
                }
                cur = cur.next;
            }
            if(this.head.val != min){
                var cur_head = this.head;
                var next_node = point.next.next;
                this.head = point.next;
                this.head.next = cur_head;
                point.next = next_node;
            }
        }
        return this;
    }
    prepend(value, before){
        if(!this.head){
            return null;
        }
        var temp = null;
        var cur = this.head;
        if(cur.val == before){
            temp = cur;
            this.head = new SLNode(value);
            this.head.next = temp;
        }
        else{
            while(cur.next && cur.next.val != before){
                cur = cur.next;
            }
            temp = cur.next;
            cur.next = new SLNode(value);
            cur.next.next = temp;
        }
        return this;
    }
    pushArray(array){
        var cur = null;
        if(!this.head){
            this.head = new SLNode(array[0]);
            cur = this.head;
        }
        else{
            cur = this.head;
            while(cur.next){
                cur = cur.next;
            }
            cur.next = new SLNode(array[0]);
            cur = cur.next;
        }
        for(var i = 1; i < array.length; i++){
            cur.next = new SLNode(array[i]);
            cur = cur.next;
        }
        return this;
    }
    reverse(){
        if(this.head && this.head.next){
            var cur = this.head;
            var prev = null;
            var next = cur.next;
            while (cur){
                cur.next = prev;
                prev = cur;
                cur = next;
                if (cur){
                    next = cur.next;
                }
            }
            this.head = prev;
            return this;
        }
    }
    partition(split){
        if(!this.head || !this.head.next){
            return this;
        }
        var lesser = new SLL();
        var greater = new SLL();
        var equal = new SLL();
        var cur = this.head;
        while(cur){
            if (cur.val < split) {
                lesser.add_front(cur.val);
            }
            else if (cur.val > split) {
                greater.add_front(cur.val);
            }
            else {
                equal.add_front(cur.val);
            }
            cur = cur.next;
        }
        this.head = lesser.head;
        lesser.back().next = equal.head;
        equal.back().next = greater.head;
        return this;
    }
    bubble_sort() {
        var end = null;
        var run = this.head;
        while (run && run.next && this.head !== end) {
            if (run.next.val < run.val) {
                let temp = run.val;
                run.val = run.next.val;
                run.next.val = temp;
            }
            if (run.next.next === end) {
                end = run.next;
                run = this.head;
            }
            else if (run.ext === end) {
                break;
            }
            else {
                run = run.next;
            }
        }
        return this;
    }
    selection_sort() {
        if (!this.head) {
            console.log("This SLL is empty");
            return this;
        }
        var start = this.head;
        var run = this.head;
        var min_node = start;
        while (start.next) {
            if (run.val < min_node.val) {
                min_node = run;
            }
            if (run.next) {
                run = run.next;
            }
            else {
                if (min_node !== start) {
                    let temp = start.val;
                    start.val = min_node.val;
                    min_node.val = temp;
                }
                start = start.next;
                min_node = start;
                run = start;
            }
        }
        return this;
    }
    insertion_sort() {
        var end = this.head;
        var run = this.head;
        while (end.next) {
            if (end.next.val > run.next.val) {
                run = run.next;
            }
            else if (end === run && end.next.val > end.val) {
                end = end.next;
                run = this.head;
            }
            else {
                let temp = end.next;
                end.next = end.next.next;
                if (temp.val < run.val) {
                    let temp2 = this.head;
                    this.head = temp;
                    this.head.next = temp2;
                }
                else {
                    let temp2 = run.next;
                    run.next = temp;
                    run.next.next = temp2;
                }
                run = this.head;
            }
        }
        return this;
    }
    merge_sort() {
        if (!this.head || !this.head.next) {
            return this;
        }
        var last_half = this.split();
        if (this.head.next) {
            this.merge_sort();
        }
        if (last_half.head.next) {
            last_half.merge_sort();
        }
        this.head = combine(this, last_half).head;
        return this;
    }
    split() {
        var flip = false;
        var run1 = this.head;
        var run2 = this.head;
        while (run2.next) {
            if (flip) {
                run1 = run1.next;
            }
            run2 = run2.next;
            flip = !flip;
        }
        var new_list = new SLL();
        new_list.head = run1.next;
        run1.next = null;
        return new_list;
    }
    returnAsArray() {
        var ret = [];
        var run = this.head;
        while (run) {
            ret.push(run.val);
            run = run.next;
        }
        return ret;
    }
    reverse() {
        var arr = this.returnAsArray();
        var run = this.head;
        while (run) {
            run.val = arr.pop();
            run = run.next;
        }
        return this;
    }
    isPalindrome() {
        var ret = true;
        var arr = this.returnAsArray();
        var half = Math.floor(arr.length/2);
        var run = this.head;
        for (let i=0; i !== half; i++, run=run.next) {
            if (run.val !== arr.pop()) {
                ret = false;
                break;
            }
        }
        return ret;
    }
    kthLastNode(k) {
        var to_run = this.length() - k;
        if (to_run < 0) {
            console.log("This SLL is too short.");
            return null;
        }
        else if (k < 1) {
            console.log("WTF mate?!");
            return null;
        }
        var count = 0,
            run = this.head;
        while (count !== to_run) {
            run = run.next;
            count++;
        }
        return run.val;
    }
    flatten() {
        var run = this.head;
        while (run) {
            if (run.child) {
                let temp = run.next;
                let run2 = run.child.head;
                while (run2.next) {
                    run2 = run2.next;
                }
                run.next = run.child.head;
                run2.next = temp;
            }
            run = run.next;
        }
        return this;
    }
}
class SLQueue{
    constructor(){
        this.head = null;
        this.tail = null;
    }
    add_front(value){
        if(!this.head){
            this.head = new SLNode(value);
            this.tail = this.head;
        }
        else if (!this.head.next){
            this.head = new SLNode(value);
            this.head.next = this.tail;
        }
        else {
            var temp = this.head;
            this.head = new SLNode(value);
            this.head.next = temp;
        }
        return this;
    }
    add_back(value){
        if(!this.head){
            this.head = new SLNode(value);
            this.tail = this.head;
        }
        else if (!this.head.next){
            this.head.next = new SLNode(value);
            this.tail = this.head.next;
        }
        else {
            this.tail.next = new SLNode(value);
            this.tail = this.tail.next;
        }
        return this;
    }
    pushArray(array){
        var cur = null;
        if(!this.head){
            this.head = new SLNode(array[0]);
            cur = this.head;
        }
        else{
            cur = this.head;
            while(cur.next){
                cur = cur.next;
            }
            cur.next = new SLNode(array[0]);
            cur = cur.next;
        }
        for(var i = 1; i < array.length; i++){
            cur.next = new SLNode(array[i]);
            cur = cur.next;
        }
        this.tail = cur;
        return this;
    }
    front(){
        return this.head?this.head.val:null;
    }
    back(){
        return this.tail?this.tail.val:null;
    }
    remove_front(){
        var val = null;
        if(!this.head){
            return val;
        }
        else if(!this.head.next){
            val = this.head.val;
            this.head = null;
            this.tail = null;
        }
        else{
            val = this.head.val;
            this.head = this.head.next;
        }
        return val;
    }
    display(){
        if (!this.head){
            return null;
        }
        var ret = "";
        var cur = this.head;
        while (cur){
            ret += cur.val;
            if (cur.next){
                ret += " , ";
            }
            cur = cur.next;
        }
        return ret;
    }
}

function compareQueues(Q1, Q2){
    run1 = Q1.head;
    run2 = Q2.head;
    valid = true;
    while (run1 && run2){
        if (run1.val != run2.val){
            valid = false;
            break;
        }
        run1 = run1.next;
        run2 = run2.next;
    }
    return run1 == run2 && valid;
}

class SLNode {
    constructor(value) {
        this.val = value;
        this.next = null;
        this.child = null;
    }
}

function combine(SLL_1, SLL_2) {
    // takes two sorted SLLs (ascending order)
    if (!SLL_1.head || !SLL_2.head) {
        console.log("One or both of these lists is empty. Returning the non-empty list, or list 1.");
        if (SLL_2.head) {
            return SLL_2;
        }
        else {
            return SLL_1;
        }
    }
    // find list that starts with smaller number, set that as main runner, run_2 for other list
    var run_main = SLL_1.head.val < SLL_2.head.val ? SLL_1.head : SLL_2.head;
    var run_2 = run_main == SLL_1.head ? SLL_2.head : SLL_1.head;
    // keep track of which list is the one you will be merging into and returning
    var which_main = run_main == SLL_1.head ? SLL_1 : SLL_2;
    while (run_2) {
        // when second list is done, you are finished merging everything into main
        if (run_main.next === null) {
            // if at the end of main list, we can just add everything from second list
            // disconnect run_2 from second list before adding to avoid circular reference
            run_main.next = run_2;
            break;
        }
        else if (run_2.val <= run_main.next.val) {
            // if secondary list runner value is between main runner and the next node in main, insert it
            // store temp for the primary list
            let temp = run_main.next;
            let temp2 = run_2.next;
            // disconnect run_2 from second list before adding to avoid circular reference
            run_2.next = null;
            run_main.next = run_2;
            // before linking that merged node to the temp, first move forward runner
            // to save reference to the second list
            run_2 = temp2;
            // now connect merged node to temp, and move forward that runner
            run_main.next.next = temp;
        }
        else {
            // otherwise, advance run_main to find a node smaller than the one you'd like to merge
            run_main = run_main.next;
        }
    }
    return which_main;
}

function flatten_SLQ(SLQ) {
    var run = SLQ.head;
    while (run) {
        if (run.child) {
            flatten_SLQ(run.child);
            let temp = run.next;
            run.next = run.child.head;
            run.child.tail.next = temp;
            run = temp;
        }
        else {
            run = run.next;
        }
    }
    return SLQ;
}

function unflatten_SLQ(SLQ) {
    var run = SLQ.head;
    while (run) {
        if (run.child) {
            unflatten_SLQ(run.child);
            run.next = run.child.tail.next;
            run.child.tail.next = null;
        }
        run = run.next;
    }
    return SLQ;
}

var test_list = new SLL();
test_list.pushArray([1,3,3,4,5,6,8,9]);

var test_list_2 = new SLL();
test_list_2.pushArray([2,2,3,4,5,6,7,12,14,15,17]);

test_list.head.next.next.child = test_list_2;
console.log(test_list.display());
console.log(test_list.flatten().display());

var test_queue = new SLQueue();
test_queue.pushArray([1,2,3,7,5,6]);
var test_queue_2 = new SLQueue();
test_queue_2.pushArray([1,2,3,7,5,6]);

test_queue.head.next.next.child = test_queue_2;

console.log(test_queue.display());
console.log(flatten_SLQ(test_queue).display());
console.log(unflatten_SLQ(test_queue).display());

// console.log(combine(test_list, test_list_2).display());

/* var list_3 = new SLL();
list_3.pushArray([5,2,3,6,8,1,4,10,7]);
console.log(list_3.merge_sort().display());

console.log(test_list.display());
console.log(test_list.insertion_sort().display());

// some SLL tests
const test_list = new SLL();
test_list.add_front(4);
console.log(test_list.front());
test_list.add_front('A');
console.log(test_list.front());
test_list.pushArray([1,2,3,4,5,6]);
console.log(test_list.display());
test_list.reverse();
console.log(test_list.display());
test_list.prepend("Q", 2);
console.log(test_list.display());
var test_list2 = new SLL();
test_list2.pushArray([1,2,3,4,5,6]);
test_list2.partition(5);
console.log(test_list2.display()); */

// some SLQueue tests
/*
const test_queue = new SLQueue();
test_queue.pushArray([1,2,3,7,5,6]);
const test_queue_2 = new SLQueue();
test_queue_2.pushArray([1,2,3,7,5,6]);
console.log(compareQueues(test_queue, test_queue_2));
*/
