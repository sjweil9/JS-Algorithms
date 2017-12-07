module.exports = function(arr){
    var len = 0;
    var temp = {};
    for (var i=0; i < arr.length; i++) {
        if (!temp[arr[i]]){
            temp[arr[i]] = true;
            arr[len] = arr[i];
            len++;
        }
    }
    arr.length = len;
    return arr;
}

/*
console.log(remove_dupes([1,2,1,3,2,4,5]));
console.log(remove_dupes([1,2,1,3,4,1,2]));
*/