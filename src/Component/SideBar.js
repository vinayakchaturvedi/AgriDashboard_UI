import React, {Component} from "react";
import "../App.css";

class SideBar extends Component {

    constructor() {
        super();
    }

    render() {
        return (
            <div className="SideBar">
                <div className="wrapper">
                    <div className="sidebar">
                        <h2>Select Datapoint</h2>
                        <ul>
                            <li><a href="#"><i className="fas"/>Seed</a></li>
                            <li><a href="#"><i className="fas"/>Kharif Crop</a></li>
                            <li><a href="#"><i className="fas"/>Fertilizer</a></li>
                            <li><a href="#"><i className="fas"/>Reservoir</a></li>
                            <li><a href="#"><i className="fas"/>Micro Irrigation</a></li>
                            <li><a href="#"><i className="fas"/>Milk</a></li>
                            <li><a href="#"><i className="fas"/>Eggs</a></li>
                            <li><a href="#"><i className="fas"/>Agri Credit</a></li>
                            <li><a href="#"><i className="fas"/>Pulses</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default SideBar