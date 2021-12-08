import React from "react";
// import imglog from "../../llo.png";
// import "./style.scss";
import { withRouter } from 'react-router-dom';

//const bcrypt = require('bcrypt');

import bcrypt from 'bcryptjs'


class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            password: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.saveUser = this.saveUser.bind(this);
        this.verifyUser = this.verifyUser.bind(this);
    }

    async verifyUser() {

        console.log("Verifying email confirmation");
        let email_confirmation_response = await fetch("/API" + '/Users/api/v1/resources/users/email/' + this.state.name, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;',
                'Accept': '*/*'
            }
        });

        if (email_confirmation_response.status === 200) {
            let result = await email_confirmation_response.json();

            if (result["result"] === "No results found") {
                console.warn("Wrong email address");
            }
            else {
                if (result["result"][0]["confirmed"] == "True") {
                    console.warn("VARIFIED EMAIL");

                    console.log("Verifying user");
                    let response = await fetch("/API" + '/Users/api/v1/resources/users/verify/login/' + this.state.name + '/' + this.state.password, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json;',
                            'Accept': '*/*'
                        }
                    });

                    if (response.status === 200) {
                        let result = await response.json();
                        console.log(result);

                        if (result["result"] == true) {
                            this.props.history.push({
                                pathname: '/',
                                state: { user: result }
                            })
                            console.log("VALID");
                        }
                    }
                    else {
                        alert("Invalid Credentials");
                    }
                }
                else {
                    console.warn("NOT VARIFIED");
                }
            }

        }
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    saveUser = (e) => {
        e.preventDefault();
        let user = { username: this.state.name, password: this.state.password, }
        console.log(user.username);
        console.log(user.password);
        this.verifyUser();
    }

    render() {
        return (
            <div>
                <div className="base-container" ref={this.props.containerRef}>
                    <div className="navbar-content">
                        <h1>Agri Dashboard</h1>
                    </div>
                    <div className="content">
                        <div className="form">
                            <div className="form-group">
                                <label htmlFor="username">Email</label>
                                <input value={this.state.name}
                                    onChange={this.handleChange}
                                    type="email" name="name" placeholder="Email" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input value={this.state.password}
                                    onChange={this.handleChange}
                                    type="password" name="password" placeholder="Password" />
                            </div>
                        </div>
                    </div>
                    <div className="footer">
                        <button type="button" onClick={this.saveUser} className="btn">
                            Login
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Login);