import React from 'react'
import {
    BrowserRouter as Router,
    Link,
    Switch,
    Route,
    Redirect,
    useHistory,
    useLocation
} from 'react-router-dom'

const fakeAuth = {
    isAuthenticated: false,
    authenticate: (cb) => {
        fakeAuth.isAuthenticated = true
        cb()
    },
    signout: (cb) => {
        fakeAuth.isAuthenticated = false
        cb()
    }
}

export default function AuthExample() {
    return (
        <Router>
            <AuthButton />
            <ul>
                <li>
                    <Link to='/public'>Public</Link>
                </li>
                <li>
                    <Link to='/protected'>Protected Page</Link>
                </li>
                <li>
                    <Link to='/protected2'>Protected Page 2</Link>
                </li>
            </ul>
            <div style={{ border: '2px blue solid', padding: '5px' }}>
                <Switch>
                    <Route path='/public'>
                        <PublicPage />
                    </Route>
                    <Route path='/login'>
                        <LoginPage />
                    </Route>
                    <PrivateRoute path="/protected">
                        <ProtectedPage name="Protected Page 1" />
                    </PrivateRoute>
                    <PrivateRoute path="/protected2">
                        <ProtectedPage name="Protected Page 2" />
                    </PrivateRoute>
                </Switch>
            </div>
        </Router>
    )
}

const AuthButton = () => {
    const history = useHistory()

    const signout = () => {
        fakeAuth.signout(() => {
            history.push('/')
        })
    }

    if (fakeAuth.isAuthenticated) {
        return <div>
                <span>{'Welcome! '}</span>
                <button onClick={signout}>signout</button>
            </div>
    } else {
        return <div>{'You are not logged in!'}</div>
    }
}

const PrivateRoute = ({ children, ...rest }) => {
    return <Route 
        {...rest}
        render={({ location }) => {
            if (fakeAuth.isAuthenticated) {
                return children
            } else {
                return <Redirect 
                    to={{
                        pathname: '/login',
                        state: { from: location }
                    }}
                />
            }
        }}
    />
}

const PublicPage = () => {
    return <div>{'Public Page'}</div>
}

const LoginPage = () => {
    const history = useHistory()
    const location = useLocation();

    const { from } = location.state || { from: { pathname: '/' }}

    const login = () => {
        fakeAuth.authenticate(() => {
            history.replace(from)
        })
    }

    return <button onClick={login}>Login</button>
}

const ProtectedPage = ({ name }) => {
    return <div>{name}</div>
}

