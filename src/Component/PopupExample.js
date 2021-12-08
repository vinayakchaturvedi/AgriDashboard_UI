import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import PopUp from "./PopUp";

class PopupExample extends Component {

    constructor() {
        super();
        this.state = {
            seen: false
        }
        this.togglePop = this.togglePop.bind(this)
    }

    togglePop() {
        this.setState({
            seen: !this.state.seen
        });
    };

    render() {
        return (
            <div>
                <div className="btn" onClick={this.togglePop}>
                    <button>New User?</button>
                </div>
                {this.state.seen ? <PopUp toggle={this.togglePop}/> : null}
            </div>
        );
    }
}

export default withRouter(PopupExample)