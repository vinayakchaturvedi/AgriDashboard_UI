import React, {Component} from 'react'

import LoadingScreen from 'react-loading-screen';
import {withRouter} from "react-router-dom";

class LoadingPage extends Component {

    render() {
        return (
            <div>
                <LoadingScreen
                    loading={true}
                    bgColor='#f1f1f1'
                    spinnerColor='#9ee5f8'
                    textColor='#676767'

                    text='Loading...'
                >
                    // ...
                    // here loadable content
                    // for example, async data
                    //<div>Loadable content</div>
                </LoadingScreen>
            </div>
        )
    }
}

export default withRouter(LoadingPage)