import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import LoadingPage from "./LoadingPage";

class SelectCropSummaryPage3 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rainfall: props.location.rainfall,
            rainfallStatesForLineChart: props.location.rainfallStatesForLineChart,
            yearsForRainfall: props.location.years,
            yearsForCrop: [],
            cropStatesForLineChart: [],
            requestedType: "Kharif-Crop",
            cropDataset: {},
            isLoading: true,
            types: []
        }
        this.processData = this.processData.bind(this)
        this.tableRowStatesHandleClick = this.tableRowStatesHandleClick.bind(this)
        this.handleClickForProductType = this.handleClickForProductType.bind(this)
        this.handleButtonClick = this.handleButtonClick.bind(this)
    }

    async componentDidMount() {
        if (this.state.rainfall === undefined) {
            this.setState({
                rainfall: JSON.parse(localStorage.getItem('rainfall')),
                rainfallStatesForLineChart: JSON.parse(localStorage.getItem('rainfallStatesForLineChart')),
                yearsForRainfall: JSON.parse(localStorage.getItem('yearsForRainfall')),
                apis: await require('./Apis.json')
            }, () => this.processData())
        } else {
            localStorage.clear();
            localStorage.setItem('rainfall', JSON.stringify(this.state.rainfall));
            localStorage.setItem('rainfallStatesForLineChart', JSON.stringify(this.state.rainfallStatesForLineChart));
            localStorage.setItem('yearsForRainfall', JSON.stringify(this.state.yearsForRainfall));
            this.setState({
                apis: await require('./Apis.json')
            }, () => this.processData());
        }
    }

    async processData() {
        let typesTemp = []

        for (let key in this.state.apis)
            typesTemp.push(key)

        let receivedResponse = {}
        let id = this.state.requestedType
        const url = this.state.apis[id]

        let response = await fetch("/API" + url, {
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

        let givenYears = []

        for (let key in receivedResponse.result[0]) {
            if (key !== 'StateName' && key !== '_id') {
                givenYears.push(key)
            }
        }

        this.setState({
                isLoading: false,
                yearsForCrop: givenYears,
                types: typesTemp,
                cropDataset: receivedResponse
            }
        )
    }

    async handleClickForProductType(event) {
        if (event === undefined) return;

        const {name, value} = event.target

        const id = value
        const url = this.state.apis[id]
        let receivedResponse = {}

        //Load requested Data
        let response = await fetch("/API" + url, {
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
            cropDataset: receivedResponse,
            requestedType: id,
            isLoading: true
        }, () => this.processData())
    }

    tableRowStatesHandleClick(event) {
        const id = event.target.id;
        let presentStates = this.state.cropStatesForLineChart;
        if (presentStates.includes(id)) presentStates.splice(presentStates.indexOf(id), 1);
        else {
            if (presentStates.length === 3) presentStates.shift();
            presentStates.push(id);
        }
        this.setState({
            cropStatesForLineChart: presentStates
        })
    }

    handleButtonClick() {
        this.props.history.push({
            pathname: '/SelectCropSummaryPage4',
            rainfallStatesForLineChart: this.state.rainfallStatesForLineChart,
            cropStatesForLineChart: this.state.cropStatesForLineChart,
            rainfall: this.state.rainfall,
            cropDataset: this.state.cropDataset,
            yearsForRainfall: this.state.yearsForRainfall,
            yearsForCrop: this.state.yearsForCrop,
            requestedType: this.state.requestedType
        })
    }

    render() {

        if (this.state.isLoading) {
            return (
                <LoadingPage/>
            )
        }


        let years = this.state.yearsForCrop.map(
            (year, index) =>
                <th
                    key={index}
                    style={{
                        color: "#ffffff"
                    }}
                    onClick={this.tableHeaderHandleClick}
                    id={year}
                >{year}</th>
        )

        let content = this.state.cropDataset.result.map(
            (details, index) =>
                <tr key={index}>
                    <td
                        style={{
                            backgroundColor:
                                this.state.cropStatesForLineChart.includes(details.StateName)
                                    ? "#1e621c" : "#009879",
                            color: "#ffffff"
                        }}
                        onClick={this.tableRowStatesHandleClick}
                        id={details.StateName}
                    >
                        {details.StateName}</td>
                    {this.state.yearsForCrop.map(
                        (year, index1) =>
                            <td key={index1}>{details[year]}</td>
                    )}
                </tr>
        )

        const cropList = this.state.types.map(
            (item, index) => <option
                key={index}
                value={item}>
                {item}
            </option>)

        return (
            <div className="SummaryLineChart3">
                <h2 style={{marginBottom: "4%", marginLeft: "2%"}}>Summary</h2>
                <h3 style={{marginBottom: "2%", marginLeft: "2%"}}>Choose Crop for comparison</h3>
                <div className="container">
                <div
                    className="cropList one">
                    <select
                        name="requestedType"
                        value={this.state.requestedType}
                        onChange={this.handleClickForProductType}
                    >
                        {cropList}
                    </select>
                    <br/>
                </div>
                <div style={{overflow: "scroll", width: "77%", height: "500px"}} className="two">
                    <div className="Tables">
                        <table className="styled-table">
                            <thead>
                            <tr>
                                <th>State</th>
                                {years}
                            </tr>
                            </thead>
                            <tbody>
                            {content}
                            </tbody>
                        </table>
                    </div>
                </div>
                </div>
                <div style={{position: "absolute", left: "35%", textAlign: "center"}}>
                    <button className="registerButton" onClick={this.handleButtonClick}>Next</button>
                </div>
            </div>
        )
    }

}

export default withRouter(SelectCropSummaryPage3)