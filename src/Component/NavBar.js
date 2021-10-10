import React, {Component} from "react";
import "../App.css";
import v1 from "../images/V1.PNG";
import v2 from "../images/V2.PNG";
import v3 from "../images/V3.PNG";
import e1 from "../images/E1.PNG";
import e2 from "../images/E2.PNG";
import e3 from "../images/E3.PNG";
import e4 from "../images/E4.PNG";

class NavBar extends Component {

    constructor(props) {
        super();
        this.state = {
            toggleViewHandler: props.toggleViewHandler
        }
    }

    render() {
        return (
            <div className="NavBar">
                <nav>
                    <label className="LeftLabel">
                        <ul>
                            <li><h3>Toggle View</h3></li>
                            <li>
                                <img onClick={this.state.toggleViewHandler} id="line" src={v1}/>
                            </li>
                            <li>
                                <img src={v3}/>
                            </li>
                            <li>
                                <img onClick={this.state.toggleViewHandler} id="pie" src={v2}/>
                            </li>
                        </ul>
                    </label>
                    <label className="logo">NITI Aayog Dashboard</label>
                    <label className="RightLabel">
                        <ul>
                            <li>
                                <img style={{paddingLeft: "15px"}} src={e1}/>
                            </li>
                            <li>
                                <img style={{paddingLeft: "15px"}} src={e2}/>
                            </li>
                            <li>
                                <img style={{paddingLeft: "15px"}} src={e3}/>
                            </li>
                            <li>
                                <img style={{paddingLeft: "75px"}} src={e4}/>
                            </li>
                        </ul>
                    </label>
                </nav>
            </div>
        )
    }
}

export default NavBar