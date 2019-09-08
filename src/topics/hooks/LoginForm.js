import React, { useState } from 'react'

function Login() {
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

        window.fetch('/api/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: usernameInput.value,
                password: passwordInput.value,
            })
        }).then(r => r.json())
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
            { state.loading ? <div>Loading...</div> : null }
            { state.error ? <div role="alert">{state.error.message}</div> : null }
            { state.resolved ?  <div role="alert">{'Logged in successfully!'}</div> : null }
        </form>
    )
}

export default Login