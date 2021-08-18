import React from 'react'
import {
    BrowserRouter as Router,
    Link,
    Switch,
    Route,
    useParams
} from 'react-router-dom'


export function URLParameters() {
    return (
        <div>
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
        </div>   
    )
}

const Content = () => {
    const { id } = useParams()

    return <div role="heading">{`Welcome to ${id}`}</div>
}


// making testable
const withRouter = Component => {
    return (props) => () => <Router><Component {...props}/></Router>
}

export default withRouter(URLParameters)()
