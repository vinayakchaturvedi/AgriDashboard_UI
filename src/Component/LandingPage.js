import React, {Component} from "react";
import "../App.css";
import SideBar from "./SideBar";
import NavBar from "./NavBar";
import GenerateCharts from "./GenerateCharts";

class LandingPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            request: {},
            apis: {
                "Seed": "/Seed/api/v1/resources/seed/all",
                "Kharif-Crop": "/Khariff_Prod/api/v1/resources/khariff_prod/all",
                "Fertilizer": "/Fertilizer_Consumption/api/v1/resources/fertilizer_consumption/all",
                "Reservoir": "/Reservoir/api/v1/resources/reservoir/all",
                "Micro-Irrigation": "/Micro_Irrigation/api/v1/resources/area_under_micro_irrigation/all",
                "Milk": "/Milk_Prduction/api/v1/resources/milk/all",
                "Eggs": "/Eggs_Production/api/v1/resources/eggs/all"
            },
            types: [],
            isLoading: true,
            requestedType: "Kharif-Crop",
            viewType: "pie"
        }

        this.preProcessAndLoadTheData = this.preProcessAndLoadTheData.bind(this)
        this.handleClickForProductType = this.handleClickForProductType.bind(this)
        this.handleClickForToggleView = this.handleClickForToggleView.bind(this)
    }

    async componentDidMount() {
        await this.preProcessAndLoadTheData()
    }

    async preProcessAndLoadTheData() {
        let typesTemp = []

        for (let key in this.state.apis)
            typesTemp.push(key)

        let receivedResponse = {}
        let id = "Kharif-Crop"
        const url = id

        let response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        console.log(response);
        let status = response.status;
        if (status === 200) {
            receivedResponse = await response.text()
            console.log(receivedResponse);
        } else {
            console.log("Error during api call")
        }

        this.setState({
            request: receivedResponse,
            requestedType: id
        })

        this.setState({
            isLoading: false,
            types: typesTemp
        })
    }

    async handleClickForProductType(event) {
        const id = event.target.id
        const url = this.state.apis[id]
        let receivedResponse = {}

        //Load requested Data
        let response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
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

    handleClickForToggleView(event) {
        const id = event.target.id

        this.setState({
            viewType: id
        })
    }

    render() {

        if (this.state.isLoading) {
            return (
                <div/>
            )
        }

        return (
            <div className="LandingPage">
                <NavBar
                    toggleViewHandler={this.handleClickForToggleView}
                    dataset={this.state.request}/>

                <SideBar
                    types={this.state.types}
                    handler={this.handleClickForProductType}/>

                <GenerateCharts
                    dataset={this.state.request}
                    name={this.state.requestedType}
                    viewType={this.state.viewType}
                />

            </div>
        )
    }

}

export default LandingPage