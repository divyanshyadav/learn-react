import React from 'react'
import {
    BrowserRouter as Router,
    Link,
    Switch,
    Route,
    useRouteMatch
} from 'react-router-dom'

export default function CustomLink() {
    return (
        <Router>
            <ul>
                <li>
                    <MenuLink to='/' activeOnlyWhenExact>Home</MenuLink>
                </li>
                <li>
                    <MenuLink to='/about'>About</MenuLink>
                </li>
            </ul>
            <div style={{ border: '2px blue solid', padding: '5px' }}>
                <Switch>
                    <Route path='/about'>
                        <About />
                    </Route>
                    <Route path='/'>
                        <Home />
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

const MenuLink = ({to, children, activeOnlyWhenExact, ...rest}) => {
    const match = useRouteMatch({
        path: to,
        exact: activeOnlyWhenExact
    })

    return (
        <div>
            {match && '> '}
            <Link to={to} {...rest}>
                {children}
            </Link>
        </div>
    )
}


const Home = () => {
    return <div>{'Home'}</div>
}

const About = () => {
    return <div>{'About'}</div>
}

