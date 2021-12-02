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

        console.log("Verifying user");
        //API Call to get student ID for loginHook verification
        let response = await fetch("/API" + '/Users/api/v1/resources/users/user/' + this.state.name, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;',
                'Accept': '*/*'
            }
        });

        if (response.status === 200) {
            let result = await response.json();
            console.log(result);

            const hashedPassword = bcrypt.hashSync(this.state.password, '32f8e1d1b9494b8351f8f99cfb58952c')

            console.log(hashedPassword);

            // bcrypt.compare(result.password, this.state.password, function (err, res) {
                
            //     if (res) {
            //         // this.props.history.push({
            //         //     pathname: '/LandingPage',
            //         //     state: { user: result }
            //         // })
            //         console.log("VALID");
            //     } else {
            //         // response is OutgoingMessage object that server response http request
            //         console.log("INVALID");
            //     }
            // });


        }
        else {
            alert("Invalid Credentials");
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
                                <label htmlFor="username">Username</label>
                                <input value={this.state.name}
                                    onChange={this.handleChange}
                                    type="text" name="name" placeholder="Username" />
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