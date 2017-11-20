function bubble_sort(arr) {
    for (var i=arr.length-1; i>0; i--) {
        for (var k=0; k<i; k++) {
            if (arr[k+1] < arr[k]) {
                let temp = arr[k];
                arr[k] = arr[k+1];
                arr[k+1] = temp;
            }
        }
    }
    return arr;
}

function selection_sort(arr) {
    for (var i=0, len=arr.length; i<len; i++) {
        let min_idx = i;
        for (var k=i+1; k<len; k++) {
            if (arr[k] < arr[min_idx]) {
                min_idx = k;
            }
        }
        if (min_idx !== i) {
            let temp = arr[i];
            arr[i] = arr[min_idx];
            arr[min_idx] = temp;
        }
    }
    return arr;
}

function multi_key_sort(arr) {
    // assumes array of objects with last_name and first_name
    for (var i=arr.length-1; i>=0; i--) {
        for (var k=0; k<i; k++) {
            if (arr[k].last_name >= arr[k+1].last_name) {
                if (arr[k].last_name !== arr[k+1].last_name || arr[k].first_name > arr[k+1].first_name) {
                    let temp = arr[k];
                    arr[k] = arr[k+1];
                    arr[k+1] = temp;
                }
            }
        }
    }
    return arr;
}

function insertion_sort_first_draft(arr) {
    for (var i=0, len=arr.length; i !== len; i++) {
        for (var k=0; k !== i && arr[i] > arr[k]; k++) {}
        arr.splice(k,0,arr.splice(i,1)[0]);
    }
    return arr;
}

function insertion_sort(arr) {
    for (var i=0, len=arr.length; i !== len; i++) {
        let temp = arr[i];
        for (var k=i-1; k>=0 && arr[k] > temp; k--) {
            arr[k+1] = arr[k];
        }
        arr[k+1] = temp;
    }
    return arr;
}

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

function partition(arr) {
    var p = 0;
    for (var i = arr.length-1; i > 0; i--) {
        if (arr[i] < arr[p] && p < i) {
            let temp = arr[i];
            arr[i] = arr[p];
            arr[p] = temp;
            p = i;
        }
        else if (arr[i] > arr[p] && p > i) {
            let temp = arr[i];
            let temp2 = p;
            arr[i] = arr[p];
            arr[p] = temp;
            p = i;
            i = temp2;
        }
    }
    return p;
}

let test_array = [5, 1, 8, 4, 9, 2, 5, 3];
console.log(partition(test_array));
console.log(test_array);

/*
console.log(combine([1,3,5,7], [2,4,6,8]));
console.log(merge_sort([5,2,8,3,1,4,7,6]));

/*
let test_array = [{first_name: 'Stephen', last_name: 'Weil'}, {first_name: 'Andrew', last_name: 'Weil'}, {first_name: 'Stephen', last_name: 'Joseph'}, {first_name: 'Bob', last_name: 'Bobbington'}, {first_name: 'Tom', last_name: 'Bobbington'}, {first_name: 'Johnny', last_name: 'Appleseed'},];

console.log(multi_key_sort(test_array));
console.log(bubble_sort([2,10,3,-1,5,4]));
console.log(selection_sort([2,10,3,-1,5,4]));
*/

console.log(insertion_sort([2,5,-4,0,10,7,3.5]));