import React from 'react';

export const Wrapper = ({ children }) => {

    const renderChild = (child, index) => {
        const { name } = child.type
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