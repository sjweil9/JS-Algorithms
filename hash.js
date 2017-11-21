String.prototype.hashCode = function() {
    var hash = 0;
    if (this.length == 0) { return hash; }
    for (let i = 0, len = this.length; i !== len; i++) {
        let char = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash &= hash; // converts to 32b int
    }
    return hash;
};

function mod(input, div) {
    return (input % div + div) % div;
}

class hashMap {
    constructor(capacity) {
        this.cap = capacity;
        this.table = [];
        this.table.length = capacity;
        this.numKeys = 0;
    }
    add(key, val) {
        const hash = key.hashCode();
        const idx = mod(hash, this.cap);
        if (this.table[idx] === undefined) { 
            this.table[idx] = [[key, val]];
        }
        else {
            this.table[idx].push([key, val]);
        }
        this.numKeys++;
        return idx;
    }
    isEmpty() {
        return this.numKeys === 0;
    }
    find(key) {
        const hash = key.hashCode();
        const idx = mod(hash, this.cap);
        const bucket = this.table[idx];
        if (bucket === undefined) { return null; }
        for (let i = 0, len = bucket.length; i !== len; i++) {
            if (bucket[i][0] === key) {
                return bucket[i][1];
            }
        }
        return null;
    }
    remove(key) {
        const hash = key.hashCode();
        const idx = mod(hash, this.cap);
        const bucket = this.table[idx];
        let ret = null;
        if (bucket === undefined) { return ret; }
        for (let i = 0, len = bucket.length; i !== len; i++) {
            if (bucket[i][0] === key) {
                ret = bucket[i][1];
                if (i !== (len - 1)) {
                    const temp = bucket[len-1];
                    bucket[len-1] = bucket[i];
                    bucket[i] = temp;
                }
                bucket.length--;
                break;
            }
        }
        return ret;
    }
}

const test_hash = new hashMap(5);

test_hash.add('potato', 'elephant');
console.log(test_hash.table);
console.log(test_hash.find('potato'));
console.log(test_hash.remove('potato'));
console.log(test_hash.table);