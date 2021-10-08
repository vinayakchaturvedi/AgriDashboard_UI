import React, {Component} from "react";
import "../App.css";
import SideBar from "./SideBar";
import NavBar from "./NavBar";
import GeneratePieChart from "./GeneratePieChart";

class LandingPage extends Component {

    constructor() {
        super();
        this.state = {
            request: {},
            apis: {},
            types: [],
            isLoading: true,
            requestedType: "Kharif-Crop"
        }

        this.preProcessAndLoadTheData = this.preProcessAndLoadTheData.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    async componentDidMount() {

        this.setState({
            request: await require('./Kharif_Prod.json'),
            apis: await require('./Apis.json')
        }, () => this.preProcessAndLoadTheData())
    }

    async preProcessAndLoadTheData() {
        let typesTemp = []

        for (let key in this.state.apis)
            typesTemp.push(key)

        this.setState({
            isLoading: false,
            types: typesTemp
        })
    }

    async handleClick(event) {
        const id = event.target.id
        const url = this.state.apis[id]
        let receivedResponse = {}

        console.log("Received Value: ", id)

        //Load requested Data
        let response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*'
            }
        });
        let status = response.status;
        if (status === 200) {
            receivedResponse = await response.json()
        } else {
            console.log("Error during api call")
        }

        this.setState({
            request: receivedResponse,
            requestedType: id
        })
    }

    render() {

        if (this.state.isLoading) {
            return (
                <div/>
            )
        }

        console.log("Parent Name: ", this.state.requestedType)

        return (
            <div className="LandingPage">
                <NavBar/>
                <SideBar types={this.state.types}
                         handler={this.handleClick}/>

                <GeneratePieChart
                    dataset={this.state.request}
                    name={this.state.requestedType}
                />

            </div>
        )
    }

}

export default LandingPage