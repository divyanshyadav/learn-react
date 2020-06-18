import React from 'react'
import { CSSTransition } from 'react-transition-group'
import './usingCSSTransition.css'

export default function Fade({ 
    in: inProp, 
    children, 
    duration=1000, 
    ...rest 
}) {

    return (
        <div>
        <CSSTransition 
            classNames="my-node"
            in={inProp} 
            timeout={duration}
            mountOnEnter
            unmountOnExit
            {...rest}
        >
            {children}
        </CSSTransition>
        </div>
    )
}

export function CSSFadeContainer({ children }) {
    const [ show, setShow ] = React.useState(false)

    return (
        <div>
            <Fade in={show} duration={5000}>
                {children}
            </Fade>
            <button onClick={() => setShow(!show)}>{show ? 'hide' : 'show'}</button>
        </div>
    )
}