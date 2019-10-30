import React from 'react';

const camelCaseToNormal = (string) => {
    const words = []
    let word = ''
    
    for (let i = 0; i < string.length; i++) {
        if (i !== 0 && string[i] === string[i].toUpperCase()) {
            words.push(word)
            word = string[i]
        } else {
            word += string[i]
        }

        if (i === string.length - 1) {
            words.push(word)
        }
    }

    return words.join(' ')
}

export const Wrapper = ({ children, title }) => {

    const renderChild = (child, index) => {
        let { name } = child.type
        
        if (child.props.name) {
            name = child.props.name
        }

        name = camelCaseToNormal(name)
        
        return (
            <div
                key={index} 
                style={{ border: '2px solid black', margin: '10px', padding: '10px' }}
            >
                <h3>{name}</h3>
                {child}
            </div>)
    }

    return (
        <>
            {
                Array.isArray(children) ? 
                    children.map(renderChild) : 
                    renderChild(children)
            }
        </>
    )
}