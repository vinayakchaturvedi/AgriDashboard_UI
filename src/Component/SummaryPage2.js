import React, {Component} from "react";
import {Chart} from "react-chartjs-2";
import {withRouter} from "react-router-dom";
import LoadingPage from "./LoadingPage";
import {useHistory} from "react-router-dom";

class SummaryPage2 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rainfall: props.location.rainfall,
            statesForLineChart: props.location.statesForLineChart,
            years: props.location.years,
            isLoading: true
        }

        this.generateLineChart = this.generateLineChart.bind(this)
        this.handleButtonClick = this.handleButtonClick.bind(this)
        this.handleBackButton = this.handleBackButton.bind(this)

    }

    componentDidMount() {
        if (this.state.rainfall === undefined) {
            this.setState({
                rainfall: JSON.parse(localStorage.getItem('rainfall')),
                statesForLineChart: JSON.parse(localStorage.getItem('statesForLineChart')),
                years: JSON.parse(localStorage.getItem('years')),
                isLoading: false
            }, () => this.generateLineChart())
        } else {
            localStorage.setItem('rainfall', JSON.stringify(this.state.rainfall));
            localStorage.setItem('statesForLineChart', JSON.stringify(this.state.statesForLineChart));
            localStorage.setItem('years', JSON.stringify(this.state.years));
            this.setState({
                isLoading: false
            }, () => this.generateLineChart());
        }
    }

    generateLineChart() {
        if (document.getElementById("LineChart") !== null) {
            let datasets = {}

            let ctx = document.getElementById("LineChart").getContext('2d');
            for (let i = 0; i < this.state.statesForLineChart.length; i++) {
                let currState = this.state.statesForLineChart[i];
                datasets[i] = [];

                for (let j = 0, length = 0; j < this.state.rainfall.result.length; j++, length++) {
                    let obj = this.state.rainfall.result[j];


                    if (obj.StateName === currState) {
                        for (let k = 0; k < this.state.years.length; k++) {
                            datasets[i].push(obj[this.state.years[k]])
                        }

                    }
                }
            }
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: this.state.years,
                    datasets: [
                        {
                            label: this.state.statesForLineChart[0],
                            data: datasets[0],
                            borderColor: 'rgb(75, 192, 192)',
                        },
                        {
                            label: this.state.statesForLineChart[1],
                            data: datasets[1],
                            borderColor: 'rgb(45,63,36)',
                        },
                        {
                            label: this.state.statesForLineChart[2],
                            data: datasets[2],
                            borderColor: 'rgb(100,46,201)',
                        }
                    ],
                },
                options: {
                    legend: {
                        labels: {
                            fontColor: 'rgb(71,37,37)',
                            fontSize: 15
                        }
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                fontColor: 'rgb(71,37,37)',
                                fontSize: 16,
                                beginAtZero: true
                            },
                        }],
                        xAxes: [{
                            ticks: {
                                fontColor: 'rgb(71,37,37)',
                                fontSize: 16,
                            },
                        }]
                    }

                }
            });
        }
    }

    handleButtonClick() {
        this.props.history.push({
            pathname: '/SelectCropSummaryPage3',
            rainfallStatesForLineChart: this.state.statesForLineChart,
            rainfall: this.state.rainfall,
            years: this.state.years
        })
    }

    handleBackButton() {
        this.props.history.push({
            pathname: '/Summary'
        })
    }

    render() {

        if (this.state.isLoading) {
            return (
                <LoadingPage/>
            )
        }

        let states = "";
        for (let i = 0; i < this.state.statesForLineChart.length; i++) {
            states = states + this.state.statesForLineChart[i] + ", ";
        }
        states = states.substring(0, states.length - 2);

        return (
            <div className="SummaryLineChart">
                <h2 style={{marginBottom: "4%"}}>Summary</h2>
                <h3 style={{marginBottom: "2%"}}>Choose Rainfall Chart</h3>
                <div className="SummaryGraph">
                    <canvas
                        id={"LineChart"}
                        width="15%"
                        height="4%"
                    />
                </div>
                <div style={{position: "absolute", left: "35%", textAlign: "center"}}>
                    <h2>Rain fall in {states}</h2>
                    <button className="registerButton" onClick={this.handleBackButton}>Back</button>
                    <button className="registerButton" onClick={this.handleButtonClick}>Next</button>
                </div>
            </div>
        )
    }
}

export default withRouter(SummaryPage2)