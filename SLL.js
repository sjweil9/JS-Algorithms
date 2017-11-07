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
    }
}

const test_list = new SLL();
test_list.pushArray([10,-3,5,2,6,7,-5]);
console.log(test_list.display());
console.log(test_list.selection_sort().display());

// some SLL tests
/* const test_list = new SLL();
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
