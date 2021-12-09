import React, {Component} from "react";
import {Chart} from "react-chartjs-2";
import {withRouter} from "react-router-dom";
import LoadingPage from "./LoadingPage";

class SelectCropSummaryPage4 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rainfall: props.location.rainfall,
            rainfallStatesForLineChart: props.location.rainfallStatesForLineChart,
            yearsForRainfall: props.location.yearsForRainfall,
            cropDataset: props.location.cropDataset,
            cropStatesForLineChart: props.location.cropStatesForLineChart,
            yearsForCrop: props.location.yearsForCrop,
            requestedType: props.location.requestedType,
            isLoading: true
        }

        this.generateLineChartForRainfall = this.generateLineChartForRainfall.bind(this)
        this.generateLineChartForCrop = this.generateLineChartForCrop.bind(this)
        this.generateLineChart = this.generateLineChart.bind(this)
        this.handleButtonClick = this.handleButtonClick.bind(this)
        this.handleBackButton = this.handleBackButton.bind(this)
    }

    componentDidMount() {
        console.log("LocalStorage: ", localStorage)
        if (this.state.rainfall === undefined) {
            this.setState({
                rainfall: JSON.parse(localStorage.getItem('rainfall')),
                rainfallStatesForLineChart: JSON.parse(localStorage.getItem('rainfallStatesForLineChart')),
                yearsForRainfall: JSON.parse(localStorage.getItem('yearsForRainfall')),
                cropDataset: JSON.parse(localStorage.getItem('cropDataset')),
                cropStatesForLineChart: JSON.parse(localStorage.getItem('cropStatesForLineChart')),
                yearsForCrop: JSON.parse(localStorage.getItem('yearsForCrop')),
                requestedType: JSON.parse(localStorage.getItem('requestedType')),
                isLoading: false
            }, () => this.generateLineChart())
        } else {
            localStorage.setItem('rainfall', JSON.stringify(this.state.rainfall));
            localStorage.setItem('rainfallStatesForLineChart', JSON.stringify(this.state.rainfallStatesForLineChart));
            localStorage.setItem('yearsForRainfall', JSON.stringify(this.state.yearsForRainfall));
            localStorage.setItem('cropDataset', JSON.stringify(this.state.cropDataset));
            localStorage.setItem('cropStatesForLineChart', JSON.stringify(this.state.cropStatesForLineChart));
            localStorage.setItem('yearsForCrop', JSON.stringify(this.state.yearsForCrop));
            localStorage.setItem('requestedType', JSON.stringify(this.state.requestedType));
            this.setState({
                isLoading: false
            }, () => this.generateLineChart());
        }
    }

    handleButtonClick() {
        this.props.history.push({
            pathname: '/',
        })
    }

    handleBackButton() {
        this.props.history.push({
            pathname: '/SelectCropSummaryPage3',
            rainfallStatesForLineChart: this.state.rainfallStatesForLineChart,
            rainfall: this.state.rainfall,
            years: this.state.yearsForRainfall
        })
    }

    generateLineChart() {
        this.generateLineChartForRainfall();
        this.generateLineChartForCrop();
    }

    generateLineChartForRainfall() {
        if (document.getElementById("LineChartForRainfall") !== null) {
            let datasets = {}

            let ctx = document.getElementById("LineChartForRainfall").getContext('2d');
            for (let i = 0; i < this.state.rainfallStatesForLineChart.length; i++) {
                let currState = this.state.rainfallStatesForLineChart[i];
                datasets[i] = [];

                for (let j = 0, length = 0; j < this.state.rainfall.result.length; j++, length++) {
                    let obj = this.state.rainfall.result[j];


                    if (obj.StateName === currState) {
                        for (let k = 0; k < this.state.yearsForRainfall.length; k++) {
                            datasets[i].push(obj[this.state.yearsForRainfall[k]])
                        }

                    }
                }
            }
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: this.state.yearsForRainfall,
                    datasets: [
                        {
                            label: this.state.rainfallStatesForLineChart[0],
                            data: datasets[0],
                            borderColor: 'rgb(75, 192, 192)',
                        },
                        {
                            label: this.state.rainfallStatesForLineChart[1],
                            data: datasets[1],
                            borderColor: 'rgb(45,63,36)',
                        },
                        {
                            label: this.state.rainfallStatesForLineChart[2],
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

    generateLineChartForCrop() {
        if (document.getElementById("LineChartForCrop") !== null) {
            let datasets = {}

            let ctx = document.getElementById("LineChartForCrop").getContext('2d');
            for (let i = 0; i < this.state.cropStatesForLineChart.length; i++) {
                let currState = this.state.cropStatesForLineChart[i];
                datasets[i] = [];

                for (let j = 0, length = 0; j < this.state.cropDataset.result.length; j++, length++) {
                    let obj = this.state.cropDataset.result[j];


                    if (obj.StateName === currState) {
                        for (let k = 0; k < this.state.yearsForCrop.length; k++) {
                            datasets[i].push(obj[this.state.yearsForCrop[k]])
                        }

                    }
                }
            }
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: this.state.yearsForCrop,
                    datasets: [
                        {
                            label: this.state.cropStatesForLineChart[0],
                            data: datasets[0],
                            borderColor: 'rgb(75, 192, 192)',
                        },
                        {
                            label: this.state.cropStatesForLineChart[1],
                            data: datasets[1],
                            borderColor: 'rgb(45,63,36)',
                        },
                        {
                            label: this.state.cropStatesForLineChart[2],
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

    render() {

        if (this.state.isLoading) {
            return (
                <LoadingPage/>
            )
        }

        let rainfallStates = "";
        for (let i = 0; i < this.state.rainfallStatesForLineChart.length; i++) {
            rainfallStates = rainfallStates + this.state.rainfallStatesForLineChart[i] + ", ";
        }
        rainfallStates = rainfallStates.substring(0, rainfallStates.length - 2);

        let cropStates = "";
        for (let i = 0; i < this.state.cropStatesForLineChart.length; i++) {
            cropStates = cropStates + this.state.cropStatesForLineChart[i] + ", ";
        }
        cropStates = cropStates.substring(0, cropStates.length - 2);

        return (
            <div>
                <h2 style={{marginBottom: "1%"}}>Summary</h2>
                <div className="Graph">
                    <canvas
                        id={"LineChartForRainfall"}
                        width="20%"
                        height="4%"
                    />
                </div>
                <h2 style={{textAlign: "center"}}> Rain fall in {rainfallStates}</h2>
                <div className="Graph">
                    <canvas
                        id={"LineChartForCrop"}
                        width="20%"
                        height="4%"
                    />
                </div>
                <h2 style={{textAlign: "center"}}>{this.state.requestedType} in {cropStates}</h2>
                <div style={{textAlign: "center"}}>
                    <button className="registerButton" onClick={this.handleBackButton}>Back</button>
                    <button className="registerButton" onClick={this.handleButtonClick}>Finish</button>
                </div>
            </div>
        )
    }
}

export default withRouter(SelectCropSummaryPage4)