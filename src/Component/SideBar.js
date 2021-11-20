import React, {Component} from "react";
import "../App.css";

class SideBar extends Component {

    constructor(props) {
        super();
        this.state = {
            types: props.types,
            handler: props.handler,
            crop: "Kharif-Crop"
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(event) {
        const id = event.target.id;

        this.setState({
            crop: id
        }, () => this.state.handler(event))
    }


    render() {

        let availableTypes = this.state.types.map(
            (type, index) =>
                <li onClick={this.handleClick}
                    key={index}
                    id={type}
                    style={{
                        backgroundColor: this.state.crop === type ? "#b9e2c0" : "#609b74"
                    }}
                >
                    <div
                        id={type}
                        style={{color: this.state.crop === type ? "#080808" : "#ffffff"}}
                    ><i className="fas"/>{type}</div>
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