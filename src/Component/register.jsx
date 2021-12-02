import React from "react";
//import imglog from "../../llo.png";
import "./style.scss";
import {withRouter} from "react-router-dom";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            password: "",
            email: "",
            image: "default.jpg",
            loginType: "Admin"
        }
        this.handleChange = this.handleChange.bind(this);
        this.saveUser = this.saveUser.bind(this);
    }

    handleChange(event) {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        })
    }

    async saveUser() {
        if (this.state.loginType === "Admin") {
            let response = await fetch("/API" + '/Users/api/v1/resources/users/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;',
                    'Accept': '*/*'
                },
                body: JSON.stringify({
                    name: this.state.name,
                    password: this.state.password,
                    email: this.state.email,
                    image: this.state.image
                })
            });

            if (response.status === 200) {
                let user = await response.json();
                console.log("Successfully registered the user: ", user);
                this.props.history.push({
                    pathname: '/Login',
                    state: {user: user}
                })
            } else {
                console.log("Error while registering the user");
            }
        }
    }

    render() {
        return (<div>
                <div className="base-container" ref={this.props.containerRef}>
                    <div className="navbar-content">
                        <h1>Agri Dashboard</h1>
                    </div>
                    <div className="content">
                        {/* <div className="image">
                            <img src={imglog} alt="Agri Dashboard"/>
                        </div> */}
                        <div className="form">
                            <div className="form-group">
                                <label htmlFor="name">Full Name</label>
                                <input value={this.state.name}
                                       onChange={this.handleChange}
                                       type="text" name="name" placeholder="Full Name"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input value={this.state.password}
                                       onChange={this.handleChange}
                                       type="password" name="password" placeholder="Password"/>
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input value={this.state.email}
                                       onChange={this.handleChange}
                                       type="email" name="email" placeholder="Email"/>
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="image">Image</label>
                                <input value={this.state.image}
                                       onChange={this.handleChange}
                                       type="image" name="image" placeholder="Image"/>
                            </div>
                        </div>
                    </div>
                    <div className="footer">
                        <button type="button" onClick={this.saveUser} className="btn">
                            Register
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Register);