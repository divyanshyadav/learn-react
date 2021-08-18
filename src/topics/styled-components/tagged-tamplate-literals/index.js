const isFunction = (fn) => typeof fn === 'function'

function myTag(strings, ...fns) {
    return strings.reduce((acc, str, index) => {
        let compute = ''
        if (isFunction(fns[index])) {
            compute = fns[index]()
        } else if (fns[index]) {
            compute = fns[index]
        }
        return acc + str + compute
    }, '');
}

module.exports = {
    myTag
}