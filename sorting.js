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



/*
let test_array = [{first_name: 'Stephen', last_name: 'Weil'}, {first_name: 'Andrew', last_name: 'Weil'}, {first_name: 'Stephen', last_name: 'Joseph'}, {first_name: 'Bob', last_name: 'Bobbington'}, {first_name: 'Tom', last_name: 'Bobbington'}, {first_name: 'Johnny', last_name: 'Appleseed'},];

console.log(multi_key_sort(test_array));
console.log(bubble_sort([2,10,3,-1,5,4]));
console.log(selection_sort([2,10,3,-1,5,4]));
*/

console.log(insertion_sort([2,5,-4,0,10,7,3.5]));