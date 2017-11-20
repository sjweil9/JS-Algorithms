function combine(arr1, arr2) {
    var main = arr1[0] < arr2[0] ? arr1 : arr2;
    var side = main === arr1 ? arr2 : arr1;
    var m = 0;
    var s = 0;
    var orig_main_len = main.length;
    var side_len = side.length;
    main.length += side_len;
    var new_len = main.length;
    while (s !== side_len) {
        if (main[m+1] === undefined) {
            while (m !== new_len && s !== side_len) {
                main[m+1] = side[s];
                m++;
                s++;
            }
        }
        else if (side[s] >= main[m+1]) {
            m++;
        }
        else {
            for (let k = new_len-1; k > m+1; k--) {
                main[k] = main[k-1];
            }
            main[m+1] = side[s];
            s++;
            m++;
        }
    }
    return main;
}

function merge_sort(arr) {
    if (arr.length === 1) {
        return arr;
    }
    else if (arr.length === 2) {
        if (arr[0] > arr[1]) {
            let temp = arr[0];
            arr[0] = arr[1];
            arr[1] = temp;
        }
        return arr;
    }
    else {
        let mid = Math.floor(arr.length/2);
        let last_half = arr.splice(mid, arr.length-mid);
        last_half = merge_sort(last_half);
        arr = merge_sort(arr);
        return combine(arr, last_half);
    }
}

function min_3_arr_rng(arr1, arr2, arr3) {
    var arrays = [arr1, arr2, arr3];
    var temp = [];
    var fucked = true;
    var ret = {};
    for (var i = 0; i < arrays.length; i++) {
        for (var k = 0; k < arrays[i].length; k++) {
            temp = [arrays[i][k]];
            let j = (i + 1) < arrays.length ? (i + 1) : 0;
            while (j !== i) {
                fucked = true;
                for (var m = 0; m < arrays[j].length; m++) {
                    if (arrays[j][m] >= temp[temp.length-1]) {
                        temp.push(arrays[j][m]);
                        fucked = false;
                        break;
                    }
                }
                if (fucked) {
                    break;
                }
                else if (j+1 < arrays.length) {
                    j++;
                }
                else {
                    j = 0;
                }
            }
            if (!fucked) { 
                if (!('max' in ret)) {
                    ret = {min: temp[0], max: temp[2]};
                }
                else if (temp[2] - temp[0] < ret.max - ret.min) {
                    ret = {min: temp[0], max: temp[2]};
                }
            }
        }
    }
    return ret;
}

// console.log(min_3_arr_rng([1,2,4,15], [3,10,12], [5,10,13,17,23]));

function intersect(arr1, arr2) {
    // takes sorted arrays
    let i = 0,
        k = 0,
        len1 = arr1.length,
        len2 = arr2.length,
        intersected = [];
    while (i !== len1 && k !== len2) {
        if (arr1[i] === arr2[k]) {
            intersected.push(arr1[i]);
            i++;
            k++;
        }
        else if (arr1[i] < arr2[k]) {
            i++;
        }
        else {
            k++;
        }
    }
    return intersected;
}

function union(arr1, arr2) {
    var temp = {'keys': []};
    let union = [];
    for (var i=0, len=arr1.length; i !== len; i++) {
        if (!temp[arr1[i]]) {
            temp[arr1[i]] = {arr1: 1, arr2: 0};
            temp.keys.push(arr1[i]);
        }
        else {
            temp[arr1[i]].arr1++;
        }
    }
    for (var k=0, len2=arr2.length; k !== len2; k++) {
        if (!temp[arr2[k]]) {
            temp[arr2[k]] = {arr1: 0, arr2: 1};
            temp.keys.push(arr2[k]);
        }
        else {
            temp[arr2[k]].arr2++;
        }
    }
    // re-write for loops to go through both at same time so you can keep keys in order the first time, but for now...
    temp.keys = merge_sort(temp.keys);
    for (var j=0, len3=temp.keys.length; j !== len3; j++) {
        let num = temp[temp.keys[j]].arr1 > temp[temp.keys[j]].arr2 ? temp[temp.keys[j]].arr1 : temp[temp.keys[j]].arr2;
        for (var m=0; m !== num; m++) {
            union.push(temp.keys[j]);
        }
    }
    return union;
}

function intersect_unsorted(arr1, arr2) {
    var ret = [];
    var short = arr1.length < arr2.length ? arr1 : arr2;
    var long = short === arr1 ? arr2 : arr1;
    var short_len = short.length;
    var long_len = long.length;
    if (long_len === 0 || short_len === 0) {
        return ret;
    }
    var temp = {};
    for (var i = 0; i !== short_len; i++) {
        if (!(short[i] in temp)) {
            temp[short[i]] = 1;
        }
        else {
            temp[short[i]]++;
        }
    }
    var k = 0;
    while (k !== long_len && temp !== {}) {
        if (long[k] in temp) {
            ret.push(long[k]);
            temp[long[k]]--;
            if (temp[long[k]] === 0) {
                delete temp[long[k]];
            }
        }
        k++;
    }
    return ret;
}

let test1 = [6,7,2,7,6,2];
let test2 = [2,7,2,1,2];

// console.log(intersect(test1, test2));

console.log(intersect_unsorted(test1, test2));