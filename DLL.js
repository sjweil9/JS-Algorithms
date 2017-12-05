class DLL {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    addFront(val) {
        this.length++;
        if (!this.head) {
            this.head = new DLNode(val);
            this.tail = this.head;
            return this;
        }
        let temp = this.head;
        this.head = new DLNode(val);
        temp.prev = this.head;
        this.head.next = temp;
        return this;
    }
    addBack(val) {
        this.length++;
        if (!this.tail) {
            this.head = new DLNode(val);
            this.tail = this.head;
            return this;
        }
        this.tail.next = new DLNode(val);
        this.tail.next.prev = this.tail;
        this.tail = this.tail.next;
        return this;
    }
    front() {
        return this.head ? this.head.val : null;
    }
    back() {
        return this.tail ? this.tail.val : null;
    }
    contains(val) {
        var ret = false;
        var run = this.head;
        while (run && !ret) {
            if (run.val === val) {
                ret = true;
            }
            run = run.next;
        }
        return ret;
    }
    pop() {
        if (!this.tail) {
            return null;
        }
        this.length--;
        var ret = this.tail.val;
        if (!this.tail.prev) {
            this.head = null;
            this.tail = null;
        }
        else {
            this.tail = this.tail.prev;
            this.tail.next = null;
        }
        return ret;
    }
    display() {
        var ret = '';
        var run = this.head;
        while (run && run.next) {
            ret += run.val + " -> ";
            run = run.next;
        }
        // add last value, but without ->
        if (run) {
            ret += run.val;
        }
        return ret;
    }
    displayReverse() {
        var ret = '';
        var run = this.tail;
        while (run && run.prev) {
            ret += run.val + " -> ";
            run = run.prev;
        }
        if (run) {
            ret += run.val;
        }
        return ret;
    }
    prependVal(newVal, trgVal) {
        if (this.head && this.head.val === trgVal) {
            return this.addFront(newVal);
        }
        var run = this.head;
        while (run && run.next) {
            if (run.next.val === trgVal) {
                let temp = run.next;
                run.next = new DLNode(newVal);
                run.next.prev = run;
                temp.prev = run.next;
                run.next.next = temp;
                return this;
            }
            run = run.next;
        }
        console.log("Target value not found, could not prepend.");
        return this;
    }
    isPalindrome() {
        if (!this.head) {
            return false;
        }
        var front = this.head;
        var back = this.tail;
        while (front !== back && back.next !== front) {
            if (front.val !== back.val) {
                return false;
            }
            front = front.next;
            back = back.prev;
        }
        return true;
    }
    pushArray(arr) {
        var idx = 0;
        if (!this.head) {
            this.head = new DLNode(arr[0]);
            idx++;
        }
        var run = this.head;
        while (run.next) {
            run = run.next;
        }
        for (var i=idx, len=arr.length; i !== len; i++) {
            run.next = new DLNode(arr[i]);
            run.next.prev = run;
            run = run.next;
        }
        this.tail = run;
        return this;
    }
    partition_sort(trg) {
        var found = false;
        var run = this.head;
        while (run) {
            // if you find a value bigger than target, push to end
            // but only if you aren't yet "past" the target
            if (run.val > trg && !found) {
                // check first if you are changing the head
                if (this.head == run) {
                    this.head = run.next;
                    this.addBack(run.val);
                    this.head.prev = null;
                    run = this.head;
                }
                // otherwise just disconnect that node and push
                else {
                    this.addBack(run.val);
                    run.next.prev = run.prev;
                    run.prev.next = run.next;
                    run = run.next;
                }
            }
            // if you find a value smaller than target, push to front
            // but only if you already "passed" the target
            else if (run.val <= trg && found) {
                // check first if you are changing the tail
                // if so, you're done after this!
                if (this.tail == run) {
                    this.tail = run.prev;
                    this.addFront(run.val);
                    this.tail.next = null;
                    return this;
                }
                // otherwise just disconnect node and push front
                else {
                    this.addFront(run.val);
                    run.next.prev = run.prev;
                    run.prev.next = run.next;
                    run = run.next;
                }
            }
            // flip the boolean once you "pass" the target value
            else if (run.val == trg && !found) {
                found = true;
                run = run.next;
            }
            // simply advance if you don't need to change anything
            else {
                run = run.next;
            }
        }
        return this;
    }
}

class DLNode {
    constructor(val) {
        this.val = val;
        this.next = null;
        this.prev = null;
    }
}

const test = new DLL();
console.log(test.pushArray([4,3,5,2,6,1,9,1,2]).partition_sort(2).display());

/*
test.addBack(5).addBack(3).addFront(4);
console.log(test.display());
console.log(test.prependVal(9,3).display());
console.log(test.isPalindrome());

const test2 = new DLL();
test2.addBack('D').addBack('A').addBack('D');
console.log(test2.isPalindrome());
*/