'use strict'

function isInclude(arr, value) {
    return arr.includes(value);
}

let arr = [1,3,6,8,10,45,67];

console.log(isInclude(arr, 10))