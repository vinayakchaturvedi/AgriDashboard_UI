import React, {Component} from "react";
import {BrowserRouter as Router, Route} from 'react-router-dom'
import SideBar from "./Component/SideBar";
import LandingPage from "./Component/LandingPage";


class App extends Component {

    render() {
        return (
            <Router>
                <Route exact path='/' component={LandingPage}>
                </Route>
            </Router>
        )
    }
}

export default App