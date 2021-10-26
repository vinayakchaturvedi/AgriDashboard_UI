import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch, withRouter} from 'react-router-dom'
import IndiaMap from "./Component/IndiaMap";
import LandingPage from "./Component/LandingPage";


class App extends Component {

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path='/' component={LandingPage}>
                    </Route>
                    <Route exact path='/IndiaMap' component={IndiaMap}>
                    </Route>
                </Switch>
            </Router>
        )
    }
}

export default App;