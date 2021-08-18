import React, { useEffect, useRef } from 'react';

const isFunc = (fn) => typeof fn === 'function';

const myStyled = (Component) => (strings, ...exprs) => (props) => {
    const ref = useRef(null)

    useEffect(() => {
        const styles = exprs.reduce((acc, exp, idx) => {
            const value = isFunc(exp) ? exp() : exp
            return acc + value + strings[idx + 1]
        }, strings[0])

        ref.current.style = styles;
    }, [])

    return <Component ref={ref} {...props} />
}

export default myStyled;