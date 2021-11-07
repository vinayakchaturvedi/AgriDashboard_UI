import React, {Component} from "react";
import "../App.css";
import v1 from "../images/V1.PNG";
import v2 from "../images/V2.PNG";
import v3 from "../images/V3.PNG";
import e1 from "../images/E1.PNG";
import e2 from "../images/E2.PNG";
import e3 from "../images/E3.PNG";
import e4 from "../images/E4.PNG";
import {Link, withRouter} from "react-router-dom";

class NavBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            toggleViewHandler: props.toggleViewHandler,
            dataset: props.dataset
        }

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.history.push({
                pathname: '/IndiaMap',
                state: {dataset: this.state.dataset}
            }
        )
    }

    render() {
        return (
            <div className="NavBar">
                <nav>
                    <label className="LeftLabel">
                        <ul>
                            <li><h3>Toggle View</h3></li>
                            <li>
                                <img onClick={this.state.toggleViewHandler} id="line" src={v1} alt=""/>
                            </li>
                            <li>
                                <img src={v3} alt=""/>
                            </li>
                            <li>
                                <img onClick={this.state.toggleViewHandler} id="pie" src={v2} alt=""/>
                            </li>
                        </ul>
                    </label>
                    <label className="logo">NITI Aayog Dashboard</label>
                    <label className="RightLabel">
                        <ul>
                            <li>
                                <img style={{paddingLeft: "15px"}} src={e1} alt=""/>
                            </li>
                            <li>
                                <img style={{paddingLeft: "15px"}} src={e2} alt=""/>
                            </li>
                            <li>
                                <Link to="/IndiaMap" target="_blank"><img style={{paddingLeft: "15px"}} src={e3}
                                                                          alt=""/></Link>
                            </li>
                            <li>
                                <img style={{paddingLeft: "75px"}} src={e4} alt=""/>
                            </li>
                        </ul>
                    </label>
                </nav>
            </div>
        )
    }
}

export default withRouter(NavBar);