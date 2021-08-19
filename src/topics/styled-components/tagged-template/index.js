const isFunc = (fn) => typeof fn === 'function';

function myTag(strings, ...exprs) {
    return exprs.reduce((acc, exp, idx) => {
        const value = isFunc(exp) ? exp() : exp
        return acc + value + strings[idx + 1]
    }, strings[0])
}

module.exports = {
    myTag
}