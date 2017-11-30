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
}

class DLNode {
    constructor(val) {
        this.val = val;
        this.next = null;
        this.prev = null;
    }
}

const test = new DLL();
test.addBack(5).addBack(3).addFront(4);
console.log(test.display());
console.log(test.displayReverse());
