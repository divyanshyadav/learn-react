import React from 'react'
import { Transition } from 'react-transition-group'

export default function Fade({ 
    in: inProp, 
    children, 
    duration=300, 
    ...rest 
}) {
    
    const defaultStyle = {
        transition: `opacity ${duration}ms ease-in-out`,
        opacity: 0
    }
    
    const transitionStyles = {
        entering: { opacity: 1 },
        entered: { opacity: 1 },
        exiting: { opacity: 0 },
        exited: { opacity: 0 }
    }

    return (
        <div>
        <Transition 
            in={inProp} 
            timeout={duration} 
            // unmountOnExit
            {...rest}
        >
            {
                state => {
                    return (
                        <div
                        style={{
                            ...defaultStyle,
                            ...transitionStyles[state]
                        }}
                        >
                            {children}
                        </div>
                    )
                }
            }
        </Transition>
        </div>
    )
}

export function FadeContainer({ children }) {
    const [ show, setShow ] = React.useState(false)

    // React.useEffect(() => setShow(true), [])

    return (
        <div>
            <Fade in={show} duration={1000}>
                {children}
            </Fade>
            <button onClick={() => setShow(!show)}>{show ? 'hide' : 'show'}</button>
        </div>
    )
}