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
            dataset: props.dataset,
            id: "pie"
        }

        this.handleClick = this.handleClick.bind(this);
        this.handleClickLeft = this.handleClickLeft.bind(this);
    }

    handleClick() {
        this.props.history.push({
                pathname: '/IndiaMap',
                state: {dataset: this.state.dataset}
            }
        )
    }

    handleClickLeft(event) {
        const id = event.target.id

        this.setState({
            id: id
        }, () => this.state.toggleViewHandler(event))
    }

    render() {
        return (
            <div className="NavBar hover">
                <nav>
                    <label className="LeftLabel">
                        <ul>
                            <li><h3>Toggle View</h3></li>
                            <li>
                                <figure>
                                    <img
                                        style={{
                                            transform: this.state.id === "line" ? "scale(1.4)" : "scale(1)"
                                        }}
                                        onClick={this.handleClickLeft} id="line" src={v1} alt=""/>
                                </figure>
                            </li>
                            <li>
                                <img src={v3} alt=""/>
                            </li>
                            <li>
                                <figure>
                                    <img
                                        style={{transform: this.state.id === "pie" ? "scale(1.4)" : "scale(1)"}}
                                        onClick={this.handleClickLeft} id="pie" src={v2} alt=""/>
                                </figure>
                            </li>
                        </ul>
                    </label>
                    <label className="logo">NITI Aayog Dashboard</label>
                    <label className="RightLabel">
                        <ul>
                            <li>
                                <figure>
                                    <img style={{paddingLeft: "15px"}} src={e1} alt=""/>
                                </figure>
                            </li>
                            <li>
                                <figure>
                                    <img style={{paddingLeft: "15px"}} src={e2} alt=""/>
                                </figure>
                            </li>
                            <li>
                                <figure>
                                    <Link to="/IndiaMap" target="_blank"><img style={{paddingLeft: "15px"}} src={e3}
                                                                              alt=""/></Link>
                                </figure>
                            </li>
                            <li>
                                <figure>
                                    <img style={{paddingLeft: "75px"}} src={e4} alt=""/>
                                </figure>
                            </li>
                        </ul>
                    </label>
                </nav>
            </div>
        )
    }
}

export default withRouter(NavBar);