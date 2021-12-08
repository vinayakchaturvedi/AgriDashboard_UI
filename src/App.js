import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import IndiaMap from "./Component/IndiaMap";
import Register from "./Component/register";
import Login from "./Component/login";
import VerifyPin from "./Component/VerifyPin";
import LoadingPage from "./Component/LoadingPage";
import Summary from "./Component/Summary";
import SummaryPage2 from "./Component/SummaryPage2";
import SelectCropSummaryPage3 from "./Component/SelectCropSummaryPage3";
import SelectCropSummaryPage4 from "./Component/SelectCropSummaryPage4";
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
                    <Route exact path='/Register' component={Register}>
                    </Route>
                    <Route exact path='/Login' component={Login}>
                    </Route>
                    <Route exact path='/VerifyPin' component={VerifyPin}>
                    </Route>
                    <Route exact path='/LoadingPage' component={LoadingPage}>
                    </Route>
                    <Route exact path='/Summary' component={Summary}>
                    </Route>
                    <Route exact path='/SummaryPage2' component={SummaryPage2}>
                    </Route>
                    <Route exact path='/SelectCropSummaryPage3' component={SelectCropSummaryPage3}>
                    </Route>
                    <Route exact path='/SelectCropSummaryPage4' component={SelectCropSummaryPage4}>
                    </Route>
                </Switch>
            </Router>
        )
    }
}

export default App;