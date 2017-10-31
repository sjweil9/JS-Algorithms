function array_mode(arr) {
    // use an object to keep track of what we've seen, cleaned up after function finished
    var temp = {};
    // keep array of modes to account for multi-modal arrays
    var modes = [];
    // keep track of current COUNT of mode(s)
    var mode_ct = 0;
    for (var i = 0; i < arr.length; i++) {
        // if we haven't seen this num before, add to object w/ value 1
        if (!temp[arr[i]]) {
            temp[arr[i]] = 1;
        }
        // if we have seen before, increment count by 1
        else {
            temp[arr[i]]++;
        }
        // if count of this number ties the current mode_ct, add it to the modes array
        if (temp[arr[i]] === mode_ct) {
            modes.push(arr[i]);
        }
        // if count exceeds current mode_ct, reset modes array to be just that value
        else if (temp[arr[i]] > mode_ct) {
            mode_ct = temp[arr[i]];
            modes = [arr[i]];
        }
    }
    return modes;
}

var test1 = [1,1,2,3,4,1,2,2,5,6,7];
// expecting [1,2]
console.log(array_mode(test1));

var test2 = [];
// expecting empty array
console.log(array_mode(test2));

var test3 = [1,2,3,3,4,5,6];
// expecting [3]
console.log(array_mode(test3));

var test4 = [-1,-1,0,2,3,4];
// expecting [-1] - testing to make sure negative numbers are fine
console.log(array_mode(test4));

var test5 = ['a', 'a', 'b', 'c', 'd'];
// expecting ['a'] - testing with letters
console.log(array_mode(test5));