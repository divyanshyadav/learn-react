import React from 'react'

function Child({ count }) {
    printChild('render starts')

    React.useEffect(() => {
        printChild('init | effect-1')
        
        return () => {
            printChild('cleanup | effect-1')
        }
    }, [])
    
    React.useEffect(() => {
        printChild('init | effect-2 | count')
        
        return () => {
            printChild('cleanup | effect-2 | count')
        }
    }, [count])

    printChild(`count = ${count}`)


    const content = <div>{count}</div>
    
    printChild('render ends')
    
    return content
}

function Parent() {
    console.log('\n')
    printParent('render starts')
    
    const [count, setCount] = React.useState(() => {
        printParent('lazy initialization of count')
        return 0
    })
    
    const [showChild, setShowChild] = React.useState(true)
    
    React.useEffect(() => {
        printParent('init | effect-1')
        
        return () => {
            printParent('cleanup | effect-1')
        }
    }, [])
    
    React.useEffect(() => {
        printParent('init | effect-2 | count')
        
        return () => {
            printParent('cleanup | effect-2 | count')
        }
        
    }, [count])
    
    React.useEffect(() => {
        printParent('init | effect-3 | showChild')
        
        return () => {
            printParent('cleanup | effect-3 | showChild')
        }
        
    }, [showChild])

    printParent(`count = ${count}`)
    
    const content =  (
        <div>
            <div>
                <button onClick={() => setCount(count + 1)}>{`Increment`}</button>
            </div>
            <label htmlFor='check'>
                <input name='check' type='checkbox' checked={showChild} onChange={() => setShowChild(!showChild)}/>Show counter
            </label>
            {showChild && <Child count={count} />}
        </div>
    )
    
    printParent('render ends')
    
    return content
}

function print(label, message, labelCss, messageCss) {
    console.log(`%c${label}: %c${message}`, labelCss, messageCss)
}

function printParent(message) {
    print('Parent', message, "color:orange", "color:white")
}

function printChild(message) {
    print('    Child', message, "color:#bada55", "color:pink")
}

export default Parent