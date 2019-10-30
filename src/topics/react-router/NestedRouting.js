import React, { useState } from 'react'
import {
    BrowserRouter as Router,
    Link,
    Switch,
    Route,
    useRouteMatch,
    useParams,
    useHistory,
} from 'react-router-dom'

const URLBar = () => {
    const history = useHistory()
    const [url, setUrl] = useState(history.location.pathname)

    history.listen(() => {
        setUrl(history.location.pathname)
    })

    return <div style={{ border: '2px green solid', padding: '3px' }}>
        {url}
    </div>
}

export default function NestedRouting() {
    return (
        <Router>
            <URLBar />
            <ul>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/topics'>Topics</Link>
                </li>
            </ul>
            
            <div style={{ border: '2px blue solid', padding: '5px' }}>
                <Switch>
                    <Route path='/topics'>
                        <Topics />
                    </Route>
                    <Route path='/'>
                        <Home />
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}


const Home = () => {
    return <div>{'Home'}</div>
}

const Topics = () => {
    const match = useRouteMatch()

    return (
        <div>
            <h3>Topics</h3>

            <ul>
                <li>
                    <Link to={`${match.url}/ds`}>Data Structures</Link>
                </li>
                <li>
                    <Link to={`${match.url}/algorithm`}>Algorithm</Link>
                </li>
            </ul>

            <Switch>
                <Route path={`${match.path}/:topicId`}>
                    <Topic />
                </Route>
                <Route path={`${match.path}`}>
                    <h4>Please select a topic.</h4>
                </Route>
            </Switch>
        </div>
    )
}


const Topic = () => {
    let { topicId } = useParams()

    return <h4>Requested topic ID: {topicId}</h4>
}
