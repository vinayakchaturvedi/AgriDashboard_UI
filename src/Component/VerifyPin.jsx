import React from "react";
import { withRouter } from 'react-router-dom';

class VerifyPin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            pin: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.saveUser = this.saveUser.bind(this);
        this.verifyUser = this.verifyUser.bind(this);
    }

    async verifyUser() {

        var userEmail = localStorage.getItem('user-email');

        console.warn(userEmail);

        console.log("Verifying email confirmation");
        let pin_confirmation_response1 = await fetch("/API" + '/Users/api/v1/resources/users/update/confirmed/' + userEmail + '/' + this.state.pin, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;',
                'Accept': '*/*'
            }
        });

        let pin_confirmation_response = await fetch("/API" + '/Users/api/v1/resources/users/update/confirmed/' + userEmail + '/' + this.state.pin, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;',
                'Accept': '*/*'
            }
        });

        if (pin_confirmation_response.status === 200) {
            let result = await pin_confirmation_response.json();

                if (result["result"][0]["confirmed"] == "True") {
                    console.warn("EMAIL VARIFIED");

                    this.props.history.push({
                        pathname: '/Login',
                        state: { user: result }
                    })
                }
        }
        else{
            console.warn("WRONG PIN OR EMAIL");
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
        let user = { email: this.state.email, pin: this.state.pin, }
        console.log(user.email);
        console.log(user.pin);
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
                            {/* <div className="form-group">
                                <label htmlFor="username">Email</label>
                                <input value={this.state.email}
                                    onChange={this.handleChange}
                                    type="email" name="email" placeholder="Email" />
                            </div> */}
                            <div className="form-group">
                                <label htmlFor="pin">Pin</label>
                                <input value={this.state.pin}
                                    onChange={this.handleChange}
                                    type="text" name="pin" placeholder="Pin" />
                            </div>
                        </div>
                    </div>
                    <div className="footer">
                        <button type="button" onClick={this.saveUser} className="btn">
                            Verify
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(VerifyPin);