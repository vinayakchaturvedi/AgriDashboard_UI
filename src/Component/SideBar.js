import React, {Component} from "react";
import "../App.css";

class SideBar extends Component {

    constructor(props) {
        super();
        this.state = {
            types: props.types,
            handler: props.handler
        }
    }


    render() {

        let availableTypes = this.state.types.map(
            (type, index) =>
                <li onClick={this.state.handler}
                    key={index}
                    id={type}>
                    <div id={type}><i className="fas"/>{type}</div>
                </li>
        )

        return (
            <div className="SideBar">
                <div className="wrapper">
                    <div className="sidebar">
                        <h2>Select Datapoint</h2>
                        <ul>
                            {availableTypes}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default SideBar