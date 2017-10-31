// this one works for any array of integers (that is an arithmetic progression)
function find_missing(arr) {
    var min = arr[0];
    var max = arr[0];
    var n = arr.length;
    for (var i = 0; i < n; i++){
        if (arr[i] < min) {
            min = arr[i];
        }
        else if (arr[i] > max) {
            max = arr[i];
        }
    }
    var sum = ((n+1)*(min+max))/2;
    for (var j = 0; j < arr.length; j++){
        sum -= arr[j];
    }
    return sum;
}

// this one works if array is 0 to N
function better_find_missing(arr) {
    var n = arr.length;
    var sum = (n*(n+1))/2;
    for (var i = 0; i < n; i++) {
        sum -= arr[i];
    }
    return sum;
}

// console.log(find_missing([0,1,2,4,5,6,7]));
console.log(better_find_missing([0,1,2,4,5,6,7]));
console.log(find_missing([2,-4,0,-3,-2,1]));
console.log(find_missing([5,2,7,8,4,9,3]));