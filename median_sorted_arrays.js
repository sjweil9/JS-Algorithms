function median(arr1, arr2){
    var total_len = arr1.length + arr2.length;
    var med;
    var smaller;
    var bigger;
    if (arr1[arr1.length-1] < arr2[0]) {
        smaller = arr1;
        bigger = arr2;
    }
    else if (arr2[arr2.length-1] < arr1[0]) {
        smaller = arr2;
        bigger = arr1;
    }
    else {
        return interwoven_median(arr1, arr2);
    }
    if (total_len % 2 == 0) {
        if (smaller.length < bigger.length) {
            med1 = bigger[total_len/2 - smaller.length];
            med2 = bigger[total_len/2 - smaller.length - 1];
            med = (med1+med2)/2;
        }
        else if (smaller.length > bigger.length) {
            med1 = smaller[total_len/2];
            med2 = smaller[total_len/2 - 1];
            med = (med1+med2)/2;
        }
        else {
            med1 = smaller[smaller.length-1];
            med2 = bigger[0];
            med = (med1+med2)/2;
        }
    }
    else {
        if (smaller.length < bigger.length) {
            med = bigger[Math.floor(total_len/2) - smaller.length];
        }
        else if (smaller.length > bigger.length) {
            med = smaller[Math.floor(total_len/2)];
        }
    }
    return med;
}

function interwoven_median(arr1, arr2) {
    var total_len = arr1.length + arr2.length;
    var med;
    var run1 = 0;
    var run2 = 0;
    var count = 1;
    while (count <= total_len/2) {
        if (arr1[run1] <= arr2[run2]) {
            if (run1 == null || (run1 + 1) == arr1.length) {
                run2++;
                run1 = null;
            }
            else {
                run1++;
            }
        }
        else {
            if (run2 == null || (run2 + 1) == arr2.length) {
                run1++;
                run2 = null;
            }
            else {
                run2++;
            }
        }
        count++;
    }
    if (total_len % 2 == 0) {
        if (run1 == null) {
            med = (arr2[run2] + arr2[run2-1])/2;
        }
        else if (run2 == null) {
            med = (arr1[run1] + arr1[run1-1])/2;
        }
        else {
            var possibilities = [arr1[run1], arr1[run1-1], arr2[run2], arr2[run2-1]];
            possibilities.sort(function(a, b){return a-b;});
            med = (possibilities[1] + possibilities[2])/2;
        }
    }
    else {
        if (run1 == null) {
            med = Math.min(arr2[run2], arr2[run2-1]);
        }
        else if (run2 == null) {
            med = Math.min(arr1[run1], arr1[run1-1]);
        }
        else {
            med = Math.min(arr1[run1], arr2[run2]);
        }
    }
    return med;
}

// test cases
// testing even total length, diff OR same sized arrays, not interwoven
/*
arr1 = [1,2];
arr2 = [3,4,5,6,7,8];
console.log("Expecting 4.5");
console.log(median(arr1, arr2));
arr1 = [1,2,3,4,5,6];
arr2 = [7,8];
console.log("Expecting 4.5");
console.log(median(arr1, arr2));
arr1 = [1,2,3,4];
arr2 = [5,6,7,8];
console.log("Expecting 4.5");
console.log(median(arr1, arr2));
// testing other direction
arr1 = [3,4,5,6,7,8];
arr2 = [1,2];
console.log("Expecting 4.5");
console.log(median(arr1, arr2));
arr1 = [7,8];
arr2 = [1,2,3,4,5,6];
console.log("Expecting 4.5");
console.log(median(arr1, arr2));
arr1 = [5,6,7,8];
arr2 = [1,2,3,4];
console.log("Expecting 4.5");
console.log(median(arr1, arr2));
// testing odd total length, diff sized arrays, not interwoven
arr1 = [1,2];
arr2 = [3,4,5];
console.log("Expecting 3");
console.log(median(arr1, arr2));
arr1 = [3,4,5];
arr2 = [1,2];
console.log("Expecting 3");
console.log(median(arr1, arr2));
arr1 = [1,2,3];
arr2 = [4,5];
console.log("Expecting 3");
console.log(median(arr1, arr2));
arr1 = [4,5];
arr2 = [1,2,3];
console.log("Expecting 3");
console.log(median(arr1, arr2));
*/
arr1 = [1,3,5,7];
arr2 = [2,4,6,8];
console.log("Expecting 4.5");
console.log(median(arr1, arr2));
arr1 = [1,2,6,7];
arr2 = [3,4,5,6];
console.log("Expecting 4.5");
console.log(median(arr1, arr2));
arr1 = [1,2,3,7];
arr2 = [4,5,6,8];
console.log("Expecting 4.5");
console.log(median(arr1, arr2));
arr1 = [1,8,8,9];
arr2 = [3,4,5,6,6,6,7,7];
console.log("Expecting 6");
console.log(median(arr1, arr2));
arr1 = [1,2,6,7];
arr2 = [3,4,5];
console.log("Expecting 4");
console.log(median(arr1, arr2));
arr1 = [1,2,8,9,10,11];
arr2 = [3,4,5];
console.log("Expecting 5");
console.log(median(arr1, arr2));

arr1 = [0,10,12,12,13];
arr2 = [1,2];
console.log("Expecting 10");
console.log(median(arr1, arr2));

arr1 = [0,12,13,14,15,16];
arr2 = [15];
console.log("Expecting 14");
console.log(median(arr1, arr2));