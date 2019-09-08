import React, { useState } from 'react'

export const LOGIN_API = '/api/login'

function Login({ endpoint }) {
    const [state, setState] = useState({
        loading: false,
        resolved: false,
        error: null
    })

    const handleSubmit = (event) => {
        event.preventDefault()
        setState({ loading: true, resolved: false, error: null })

        const { usernameInput, passwordInput } = event.target.elements
        if (!usernameInput.value || !passwordInput.value) {
            return
        }

        window.fetch(endpoint, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: usernameInput.value,
                password: passwordInput.value,
            })
        })
        .then(r => r.json())
        .then(user => {
            setState({ loading: false, resolved: true, error: null })
            window.localStorage.setItem('token', user.token)
        }, error => {
            setState({ loading: false, resolved: false, error })
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="usernameInput">{'Username'}</label>
                <input id="usernameInput" />
            </div>
            <div>
                <label htmlFor="passwordInput">{'password'}</label>
                <input id="passwordInput" />
            </div>
            <button type="submit">Login</button>
            { state.loading && <div>Loading...</div> }
            { state.error && <div role="alert">{state.error.message}</div> }
            { state.resolved &&  <div role="alert">{'Logged in successfully!'}</div> }
        </form>
    )
}

const withLoginApi = (endpoint) => (component) => (props) => {
    return component({ endpoint, ...props })
}

export default withLoginApi(LOGIN_API)(Login)