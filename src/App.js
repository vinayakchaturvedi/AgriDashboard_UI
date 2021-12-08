import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import IndiaMap from "./Component/IndiaMap";
import LandingPage from "./Component/LandingPage";
import Register from "./Component/register";
import Login from "./Component/login";
import VerifyPin from "./Component/VerifyPin";


class App extends Component {

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path='/' component={LandingPage}>
                    </Route>
                    <Route exact path='/IndiaMap' component={IndiaMap}>
                    </Route>
                    <Route exact path='/Register' component={Register}>
                    </Route>
                    <Route exact path='/Login' component={Login}>
                    </Route>
                    <Route exact path='/VerifyPin' component={VerifyPin}>
                    </Route>

                </Switch>
            </Router>
        )
    }
}

export default App;