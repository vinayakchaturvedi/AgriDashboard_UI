import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import LoadingPage from "./LoadingPage";

class Summary extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rainfall: {},
            years: [],
            isLoading: true,
            statesForLineChart: []
        }

        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.processData = this.processData.bind(this);
        this.tableRowStatesHandleClick = this.tableRowStatesHandleClick.bind(this);
    }

    async componentDidMount() {

        let receivedResponse = {}

        let response = await fetch("/API/Rainfall/api/v1/resources/rain_fall_data/all", {
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
            rainfall: receivedResponse,
            isLoading: false
        }, () => this.processData())
    }

    processData() {
        let givenYears = []

        for (let key in this.state.rainfall.result[0]) {
            if (key !== 'StateName' && key !== '_id') {
                givenYears.push(key)
            }
        }

        this.setState({
                isLoading: false,
                years: givenYears
            }
        )
    }

    handleButtonClick() {
        this.props.history.push({
            pathname: '/SummaryPage2',
            statesForLineChart: this.state.statesForLineChart,
            rainfall: this.state.rainfall,
            years: this.state.years,
        })
    }

    tableRowStatesHandleClick(event) {
        const id = event.target.id;
        let presentStates = this.state.statesForLineChart;
        if (presentStates.includes(id)) presentStates.splice(presentStates.indexOf(id), 1);
        else {
            if (presentStates.length === 3) presentStates.shift();
            presentStates.push(id);
        }
        this.setState({
            statesForLineChart: presentStates
        })
    }

    render() {

        if (this.state.isLoading) {
            return (
                <LoadingPage/>
            )
        }

        let years = this.state.years.map(
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

        let content = this.state.rainfall.result.map(
            (details, index) =>
                <tr key={index}>
                    <td
                        style={{
                            backgroundColor:
                                this.state.statesForLineChart.includes(details.StateName)
                                    ? "#1e621c" : "#009879",
                            color: "#ffffff"
                        }}
                        onClick={this.tableRowStatesHandleClick}
                        id={details.StateName}
                    >
                        {details.StateName}</td>
                    {this.state.years.map(
                        (year, index1) =>
                            <td key={index1}>{details[year]}</td>
                    )}
                </tr>
        )

        return (
            <div className="SummaryLineChart">
                <h2 style={{marginBottom: "4%"}}>Summary</h2>
                <h3 style={{marginBottom: "2%"}}>Choose Rainfall Chart</h3>
                <div style={{overflow: "scroll", width: "77%", height: "500px"}}>
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
                <div style={{position: "absolute", left: "43%", textAlign: "center"}}>
                    <button className="registerButton" onClick={this.handleButtonClick}>Next</button>
                </div>
            </div>
        )
    }

}

export default withRouter(Summary)