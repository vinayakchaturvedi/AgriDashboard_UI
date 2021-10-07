import React, {Component} from "react";
import {Link} from 'react-router-dom';
import "../App.css";

class Welcome extends Component {

    constructor(props) {
        super();
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit() {
        this.props.history.push('/SignUp')
    }

    render() {
        return (
            <div className="Welcome">
                <body>
                <nav>
                    <input type="checkbox" id="check"/>
                    <label htmlFor="check" className="checkBtn">
                        <i className="fas fa-bars"/>
                    </label>
                    <label className="logo">EStock</label>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/About">About</Link></li>
                        <li><Link to="/Contact">Contact</Link></li>
                        <li><Link to="/SignIn">Sign in</Link></li>
                        <li className="createAccountShort"><Link to="/SignUp">Create Account</Link></li>
                    </ul>
                </nav>
                <div className="content">
                    <h1>A New Way to Invest</h1>
                    <p>EStock is the best platform to help you analyse the latest stock trends
                        and decide the stock through which you can grow your wealth.</p>
                    <button onClick={this.handleSubmit} className="createAccount">Create Account ></button>
                </div>
                </body>
            </div>
        );
    }
}

export default Welcome
