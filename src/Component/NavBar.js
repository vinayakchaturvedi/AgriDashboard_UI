import React, {Component} from "react";
import "../App.css";

class NavBar extends Component {

    constructor() {
        super();
    }

    render() {
        return (
            <div className="NavBar">
                <nav>
                    <label className="LeftLabel">
                        <ul>
                            <li>Select View:</li>
                            <li>
                                <button name="LineChart">Line Chart</button>
                            </li>
                            <li>
                                <button name="PieChart">Pie Chart</button>
                            </li>
                        </ul>
                    </label>
                    <label className="logo">NITI Aayog Dashboard</label>
                    <label className="RightLabel">
                        <ul>
                            <li>
                                <button name="Book">Book</button>
                            </li>
                            <li>
                                <button name="Sales">Sales</button>
                            </li>
                            <li>
                                <button name="India">India</button>
                            </li>
                            <li>
                                <button name="User Profile">User Profile</button>
                            </li>
                        </ul>
                    </label>
                </nav>
            </div>
        )
    }
}

export default NavBar