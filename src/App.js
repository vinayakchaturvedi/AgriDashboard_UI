import React, {Component} from "react";

class App extends Component {

    constructor() {
        super();
        this.state = {
            apiResponse: {}
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    async handleSubmit(event) {
        event.preventDefault();
        event.stopPropagation();

        let response = await fetch('/Users/api/v1/resources/users/all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Accept': '*/*'
            },

            /*body: JSON.stringify({
                customerName: this.state.firstName + " " + this.state.lastName,
                password: this.state.password,
                emailId: this.state.email,
                contactNumber: this.state.contactNumber,
            })*/
        });
        let status = response.status;
        if (status === 200) {
            console.log(await response.json())
        } else if (status === 404) {
            console.log("404 Error in api call")
        } else {
            console.log("Error in api call")
        }
    }


    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}

export default App