import React from 'react'

const AuthContext = React.createContext()

const sleep = ms => new Promise(res => setTimeout(res, ms))

const getUser = () => sleep(1000)
    .then(() => ({ username: 'ds' }))
    // .then(() => { throw new Error('some error occurred!') })

function AuthProvider({ children }) {
    const [state, setState] = React.useState({
        user: null,
        status: 'pending',
        error: null,
    })

    React.useEffect(() => {
        getUser().then(
            user => setState({ status: 'success', user, error: null }),
            error => setState({ status: 'error', user: null, error })
        )
    }, [])

    const render = () => {
        switch (state.status) {
            case 'pending':
                return <div>Loading...</div>;
            case 'success':
                return children
            case 'error':
                return <div>{state.error.message}</div>
            default:
                return null
        }
    }

    return (
        <AuthContext.Provider value={{ ...state }}>
            {render()}
        </AuthContext.Provider>
    )
}

function useAuthState() {
    const context = React.useContext(AuthContext)
    return context
}

function AuthenticatedApp() {
    return <div>Authenticated App</div>
}

function UnAuthenticatedApp() {
    return <div>Un-authenticated App</div>
}

function Home() {
    const {user} = useAuthState()
    return user ? <AuthenticatedApp /> : <UnAuthenticatedApp />
}

export default function App() {
    return (
        <AuthProvider>
            <Home />
        </AuthProvider>
    )
}