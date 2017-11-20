class PriQNode {
    constructor(val, pri) {
        this.val = val;
        this.pri = pri;
        this.next = null;
    }
}

class PriQ {
    constructor() {
        this.head = null;
    }

    push(val, pri) {
        if (!this.head) {
            this.head = new PriQNode(val, pri);
            return this;
        }
        if (pri > this.head.pri) {
            let temp = this.head;
            this.head = new PriQNode(val, pri);
            this.head.next = temp;
            return this;
        }
        let run = this.head;
        while (run.next && pri < run.next.pri) {
            run = run.next;
        }
        let temp = run.next;
        run.next = new PriQNode(val, pri);
        run.next.next = temp;
        return this;
    }

    pop() {
        if (!this.head) {
            return null;
        }
        let ret = this.head.val;
        this.head = this.head.next;
        return ret;
    }

    display() {
        let run = this.head;
        let string = "";
        while (run) {
            string += "{val: " + run.val + ", priority: " + run.pri + "}";
            if (run.next) {
                string += " --> ";
            }
            run = run.next;
        }
        console.log(string);
        return this;
    }
}

const test = new PriQ();
test.push("More priority", 5).push("Less priority", 2).push("Medium priority", 3);
console.log(test.pop());
test.display();
