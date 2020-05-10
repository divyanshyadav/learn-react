import React from 'react'
// import PropTypes from 'prop-types'

function Greet({ firstName, lastName }) {
    return <h3>
        {`Hello ${firstName} ${lastName}!`}
    </h3>
}

const string = (props, propName, componentName) => {
    if (props[propName] && typeof props[propName] !== 'string') {
        return new Error(`The component ${componentName} expects prop ${propName} to be a string but passed a ${typeof props[propName]}`)
    }
}

string.isRequired = (props, propName, componentName) => {
    if (typeof props[propName] !== 'string') {
        throw new Error(`In component '${componentName}' prop '${propName}' is marked as required but its value is '${typeof props[propName]}'`)
    }
}

const PropTypes = {
    string: string
}

Greet.propTypes = {
    firstName: PropTypes.string,
    lastName: PropTypes.string.isRequired
}

Greet.defaultProps = {
    lastName: "Yad",
    firstName: "div"
}

const CustomPropTypes = () => <Greet />

export default CustomPropTypes