class Minheap {
    constructor() {
        this.heap = [null];
    }

    insert(val) {
        this.heap.push(val);
        if (this.heap.length == 2) {
            return this;
        }
        let i = this.heap.length - 1;
        while (this.heap[i] < this.heap[Math.floor(i/2)] && i > 1) {
            let temp = this.heap[Math.floor(i/2)];
            this.heap[Math.floor(i/2)] = this.heap[i];
            this.heap[i] = temp;
            i = Math.floor(i/2);
        }
        return this;
    }

    extract() {
        if (this.heap.length < 2) {
            return null;
        }
        let i = 1;
        let ret = this.heap[i];
        this.heap[i] = this.heap[this.heap.length - 1];
        this.heap.length--;
        while ( (this.heap[i] > this.heap[(2*i)]) || (this.heap[i]) > this.heap[(2*i) + 1] && i < this.heap.length ) {
            let swap_idx = this.heap[(2*i)] < this.heap[(2*i) + 1] ? (2*i) : (2*i) + 1;
            let temp = this.heap[i];
            this.heap[i] = this.heap[swap_idx];
            this.heap[swap_idx] = temp;
            i = swap_idx;
        }
        return ret;
    }

    heapify(arr) {
        // can probably do this better
        for (let i = 0, len = arr.length; i !== len; i++) {
            this.insert(arr[i]);
        }
        return this;
    }

    size() {
        return this.heap.length - 1;
    }

    isEmpty() {
        return this.heap.length === 1;
    }

    contains(val) {
        if (val < this.heap[1]) {
            return false;
        }
        return this.heap.contains(val);
    }

    top() {
        return this.heap[1];
    }
}

const test_heap = new Minheap();
test_heap.insert(10).insert(5).insert(3).insert(7).insert(6);
console.log(test_heap.heap);
console.log(test_heap.extract());
console.log(test_heap.heap);

const test2 = new Minheap();
test2.heapify([4,10,7,3,5,9,6,4,12,-3]);
console.log(test2.heap);