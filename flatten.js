const flatten = function (array) {
    let flattened = []
    for (let i = 0, len = array.length; i < len; i++) {
        if (Array.isArray(array[i])) {
            flattened = flattened.concat(flatten(array[i]))
        } else {
            flattened.push(array[i])
        }
    }
    return flattened
}

const array = [[1, 2, [3]], 4]

console.log('initial array is -> ' + JSON.stringify(array))
console.log('flattened array is -> ' + JSON.stringify(flatten(array)))
