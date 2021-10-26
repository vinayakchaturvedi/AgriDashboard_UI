import React, {Component} from "react";
import "../App.css";
import {Chart} from "react-chartjs-2";

class GeneratePieChart extends Component {

    constructor(props) {
        super();
        this.state = {
            dataset: props.dataset,
            years: [],
            isLoading: true,
            name: props.name,
            viewType: props.viewType,
            yearsForPieChart: [],
            statesForLineChart: []
        }

        this.getRandomColor = this.getRandomColor.bind(this);
        this.loadData = this.loadData.bind(this);

        this.tableHeaderHandleClick = this.tableHeaderHandleClick.bind(this);
        this.tableRowStatesHandleClick = this.tableRowStatesHandleClick.bind(this);

        this.createChart = this.createChart.bind(this);

        this.createPieChart = this.createPieChart.bind(this);
        this.createLineChart = this.createLineChart.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            dataset: nextProps.dataset,
            years: [],
            isLoading: true,
            name: nextProps.name,
            viewType: nextProps.viewType
        }, () => this.loadData());
    }

    componentDidMount() {
        this.loadData()
    }

    loadData() {
        let givenYears = []
        let yearsForPieChart = []
        let statesForLineChart = []

        for (let key in this.state.dataset.result[0]) {
            if (key !== 'StateName' && key !== '_id') {
                givenYears.push(key)
                if (yearsForPieChart.length < 3) {
                    yearsForPieChart.push(key);
                }
            }
        }

        statesForLineChart.push(this.state.dataset.result[0].StateName);
        statesForLineChart.push(this.state.dataset.result[1].StateName);
        statesForLineChart.push(this.state.dataset.result[2].StateName);

        this.setState({
                isLoading: false,
                years: givenYears,
                yearsForPieChart: yearsForPieChart,
                statesForLineChart: statesForLineChart
            },
            () => this.createChart()
        )
    }


    getRandomColor() {
        let letters = '0123456789ABCDEF'.split('');
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    createChart() {
        this.createPieChart();
        this.createLineChart();
    }

    createPieChart() {
        let chartColors = [];
        let labelMap = {};

        for (let i = 0; i < this.state.yearsForPieChart.length; i++) {
            let currYear = this.state.yearsForPieChart[i];

            if (document.getElementById("PieChart" + i) !== null) {
                let ctx = document.getElementById("PieChart" + i).getContext('2d');
                let tempData = [];
                let labels = [];

                for (let j = 0, length = 0; j < this.state.dataset.result.length; j++, length++) {
                    let obj = this.state.dataset.result[j]

                    tempData.push(obj[currYear])
                    if (i === 0) {
                        let color = this.getRandomColor()
                        chartColors.push(color)

                        labelMap[obj.StateName] = color;
                    }
                    labels.push(obj.StateName)
                }


                new Chart(ctx, {
                    type: "pie",
                    options: {
                        legend: {
                            display: false,
                            position: 'right',
                            align: 'end'
                        }
                    },
                    data: {
                        labels: labels,
                        datasets: [
                            {
                                data: tempData,
                                backgroundColor: chartColors,
                            }
                        ],
                    },
                });
            }
        }
    }

    createLineChart() {

        if (document.getElementById("LineChart") !== null) {
            let datasets = {}

            let ctx = document.getElementById("LineChart").getContext('2d');
            for (let i = 0; i < this.state.statesForLineChart.length; i++) {
                let currState = this.state.statesForLineChart[i];
                datasets[i] = [];

                for (let j = 0, length = 0; j < this.state.dataset.result.length; j++, length++) {
                    let obj = this.state.dataset.result[j];


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

    tableHeaderHandleClick(event) {
        const id = event.target.id
        let presentYears = this.state.yearsForPieChart;
        if (presentYears.includes(id)) presentYears.splice(presentYears.indexOf(id), 1);
        else {
            if (presentYears.length === 3) presentYears.shift();
            presentYears.push(id);
        }
        this.setState({
            yearsForPieChart: presentYears
        }, () => this.createChart())
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
        }, () => this.createChart())
    }

    render() {

        if (this.state.isLoading) {
            return (
                <div/>
            )
        }

        let years = this.state.years.map(
            (year, index) =>
                <th
                    key={index}
                    onClick={this.tableHeaderHandleClick}
                    id={year}
                >{year}</th>
        )

        let content = this.state.dataset.result.map(
            (details, index) =>
                <tr key={index}>
                    <td
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

        let canvasListForPie = [];
        let title = "";

        for (let i = 0; i < this.state.yearsForPieChart.length; i++) {
            title = title + this.state.yearsForPieChart[i] + ", "

            canvasListForPie.push(
                <div style={{
                    width: "30%", height: "50%"
                }} className="pieCharts"
                     key={i}>
                    <canvas
                        id={"PieChart" + i}
                        width="20%"
                        height="10%"
                    />
                </div>
            )
        }
        title = title.substring(0, title.length - 2)

        return (
            <div className="main_content">
                <div className="Graph">
                    <div style={{display: this.state.viewType === "pie" ? "block" : "none"}}>
                        {canvasListForPie}
                    </div>
                    <div style={{display: this.state.viewType === "line" ? "block" : "none"}}>
                        <canvas
                            id={"LineChart"}
                            width="20%"
                            height="5%"
                        />
                    </div>
                    <h1 style={{color: "#4b4559"}}>{this.state.name}</h1>
                    <h3 style={{color: "rgb(99 99 99)", display: this.state.viewType === "pie" ? "block" : "none"}}>
                        (Years: {title})
                    </h3>
                </div>
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
        )
    }
}

export default GeneratePieChart