import React from 'react'
import {
    BrowserRouter as Router,
    Link,
    Switch,
    Route,
    useParams
} from 'react-router-dom'


export default function URLParameters() {
    return (
        <Router>
            <ul>
                <li>
                    <Link to='/netflix'>Netflix</Link>
                </li>
                <li>
                    <Link to='/amazon-prime'>Amazon Prime</Link>
                </li>
            </ul>

            <Switch>
                <Route path='/:id' children={<Content />} />
            </Switch>
        </Router>
    )
}

const Content = () => {
    const { id } = useParams()

    return <div>{id}</div>
}


