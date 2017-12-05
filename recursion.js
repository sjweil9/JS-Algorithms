function sigma(num) {
    num = Math.trunc(num);
    if (num < 1) {
        return 0;
    }
    else if (num === 1) {
        return 1;
    }
    return num + sigma(num-1);
}

function factorial(num) {
    num = Math.trunc(num);
    if (num <= 1) {
        return 1;
    }
    return num * factorial(num-1);
}

function fibo(target, num=1, memo=0, count=1) {
    target = Math.trunc(target);
    if (target <= 0) {
        return 0;
    }
    if (count === target) {
        return num;
    }
    count++;
    return fibo(target, num+memo, num, count);
}

function binarySearch(arr, target) {
    let midpt = Math.floor(arr.length / 2);
    if (arr[midpt] === target) {
        return true;
    }
    else if (arr.length === 1 || (arr.length === 2 && target > arr[midpt])) {
        return false;
    }
    let to_search = target > arr[midpt] ? arr.splice(midpt + 1, arr.length - 1 - midpt) : arr.splice(0, midpt);
    return binarySearch(to_search, target);
}

function gcf(a, b, c=a) {
    if (a % c === 0 && b % c === 0) {
        return c;
    }
    return gcf(a, b, c-1);
}

function floodfill(matrix, x, y, color, target = matrix[y][x]) {
    matrix[y][x] = color;
    if (x > 0 && matrix[y][x-1] === target) {
        floodfill(matrix, x-1, y, color, target);
    }
    if (x < matrix[y].length-1 && matrix[y][x+1] === target) {
        floodfill(matrix, x+1, y, color, target);
    }
    if (y > 0 && matrix[y-1][x] === target) {
        floodfill(matrix, x, y-1, color, target);
    }
    if (y < matrix.length-1 && matrix[y+1][x] === target) {
        floodfill(matrix, x, y+1, color, target);
    }
}

var test_matrix = [
    [0,1,2],
    [1,1,1],
    [2,1,0]
];

floodfill(test_matrix, 1, 1, 2);

console.log(test_matrix);

/*
console.log(gcf(10,13));
console.log(gcf(24,18));

let test = [1,2,3,4,5,6,7,8];
console.log(binarySearch(test, 2));
console.log(binarySearch(test, 12));

console.log(sigma(5));
console.log(sigma(10));

console.log(factorial(3));
console.log(factorial(7));

console.log(fibo(3));
console.log(fibo(6));
*/