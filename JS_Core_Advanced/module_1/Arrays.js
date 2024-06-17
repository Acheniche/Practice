function firstHalfSum(arr) {
    if (arr.length % 2 === 0) {
        return arr.slice(0, Math.floor(arr.length / 2)).reduce((a, b) => a + b, 0);
    } else {
        return arr.slice(0, Math.floor(arr.length / 2) + 1).reduce((a, b) => a + b, 0);
    }
}

let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(firstHalfSum(arr));