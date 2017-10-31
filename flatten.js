// flattens an array containing any number of nested arrays
function flatten(arr) {
    var i = 0;
    while (i < arr.length) {
        if (Array.isArray(arr[i])) {
            // if we find an array, increase length of our base array by 1 less than
            // length of that array (because we are using its original spot in base array)
            var added_len = arr[i].length-1;
            arr.length += added_len;
            // then shift all elements in array past i to the end of the array, freeing up spots
            for (var k = arr.length-1; (k-added_len) > i; k--) {
                arr[k] = arr[k-added_len];
            }
            // store the nested array in a temporary variable
            var temp = arr[i];
            // loop through the nested array, placing each of its elements into the base array
            // first element will go into i (b/c j is zero), each subsequent element goes one further
            for (var j = 0; j < temp.length; j++) {
                arr[i+j] = temp[j];
            }
        }
        else {
            // do not increment i if the item we just looked at was an array
            // this way, if there was an array nested inside THAT array, we will check again
            i++;
        }
    }
    return arr;
}

var test1 = [1,2,[3,4,[5,6,[7,8]]],[9,[10,11]]];
// expecting [1,2,3,4,5,6,7,8,9,10,11]
console.log(flatten(test1));