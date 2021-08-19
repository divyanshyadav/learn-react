import React, { useEffect, useRef } from 'react';
import { myTag } from './tagged-template';


const myStyled = (Component) => (strings, ...exprs) => (props) => {
    const ref = useRef(null)

    useEffect(() => {
        const styles = myTag(strings, ...exprs)
        ref.current.style = styles;
    }, [])

    return <Component ref={ref} {...props} />
}

export default myStyled;