import React, {Component} from "react";
import "../App.css";
import v1 from "../images/V1.PNG";
import v2 from "../images/V2.PNG";
import v3 from "../images/V3.PNG";
import e1 from "../images/E1.PNG";
import e2 from "../images/E2.PNG";
import e3 from "../images/E3.PNG";
import e4 from "../images/E4.PNG";
import nitiLogo from "../images/NITI-Aayog-logo.png"
import {Link, withRouter} from "react-router-dom";
import Popup from "./Popup";

class NavBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            toggleViewHandler: props.toggleViewHandler,
            dataset: props.dataset,
            id: "pie",
            popUpTrigger: false,
            sideBarHandler:props.sideBarHandler
        }

        this.handleClick = this.handleClick.bind(this);
        this.handleClickLeft = this.handleClickLeft.bind(this);
        this.handlePopUp = this.handlePopUp.bind(this);
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

    handlePopUp(){
        //console.log("called")
        console.log(this.state.popUpTrigger);
        const prevTrigger = this.state.popUpTrigger;
        this.setState(prevState =>({
            ...prevState,
            popUpTrigger : !prevTrigger
        }))
        this.state.sideBarHandler();
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
                    <label className="logo"> <img src={nitiLogo} style={{height:"90px",paddingRight:"20px",marginLeft:"200px",marginTop:"5px"}}/></label>
                    {/*<label className="logo">Niti Aayog Dashboard</label>*/}
                    <label className="RightLabel">
                        <ul>
                            <li>
                                <figure>
                                    <img style={{paddingLeft: "15px"}} src={e1} alt=""/>
                                </figure>
                            </li>
                            <li>
                                <figure>
                                    <img style={{paddingLeft: "15px",paddingRight: "15px"}} src={e2} alt=""/>
                                </figure>
                            </li>
                            <li>

                                    {/*<Link to="/IndiaMap" target="_blank"><img style={{paddingLeft: "15px"}} src={e3}*/}
                                    {/*                                          alt=""/></Link>*/}
                                    <button style={{border:"0px"}} onClick={this.handlePopUp} >
                                        <img  src={e3} alt=""/>
                                    </button>
                                    <Popup trigger={this.state.popUpTrigger} sideBarHandler={this.state.sideBarHandler}>
                                    </Popup>

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