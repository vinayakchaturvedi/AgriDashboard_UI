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
            labels: []
        }

        this.createChart = this.createChart.bind(this);
        this.getRandomColor = this.getRandomColor.bind(this);
        this.loadYears = this.loadYears.bind(this);
        this.generatePieChart = this.generatePieChart.bind(this);
        this.tableHeaderHandleClick = this.tableHeaderHandleClick.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            dataset: nextProps.dataset,
            years: [],
            isLoading: true,
            name: nextProps.name,
            viewType: nextProps.viewType
        }, () => this.loadYears());
    }

    loadYears() {
        let givenYears = []
        let yearsForPieChart = []

        for (let key in this.state.dataset.result[0]) {
            if (key !== 'StateName' && key !== '_id') {
                givenYears.push(key)
                if (yearsForPieChart.length < 3) {
                    yearsForPieChart.push(key);
                }
            }
        }

        this.setState({
                isLoading: false,
                years: givenYears,
                yearsForPieChart: yearsForPieChart
            },
            () => this.createChart()
        )
    }

    componentDidMount() {
        this.loadYears()
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

        let chartColors = [];
        let labelMapping = [];
        let labelMap = {};
        const maxLength = 10;

        for (let i = 0; i < this.state.yearsForPieChart.length; i++) {
            let currYear = this.state.yearsForPieChart[i];
            let showLabels = i === this.state.yearsForPieChart.length - 1;

            if (document.getElementById("PieChart" + i) !== null) {
                let ctx = document.getElementById("PieChart" + i).getContext('2d');
                let tempData = [];
                let labels = [];

                for (let j = 0, length = 0; j < this.state.dataset.result.length; j++, length++) {
                    let obj = this.state.dataset.result[j]

                    if (length % 8 === 0) {
                        labelMapping.push(labelMap);
                        labelMap = {};
                    }

                    tempData.push(obj[currYear])
                    if (i === 0) {
                        let color = this.getRandomColor()
                        chartColors.push(color)

                        labelMap[obj.StateName] = color;
                    }
                    labels.push(obj.StateName)
                }

                labelMapping.push(labelMap);

                this.setState({
                    labels: labelMapping
                }, () => this.generatePieChart(ctx, labels, tempData, chartColors, showLabels, currYear));
            }
        }
    }

    generatePieChart(ctx, labels, tempData, chartColors, showLabels, title) {
        let currPieChart = new Chart(ctx, {
            type: this.state.viewType,
            options: {
                legend: {
                    display: false,
                    position: 'right',
                    align: 'end'
                },
                title: {
                    display: false,
                    fontColor: 'rgb(62,129,196)',
                    fontSize: 26,
                    text: title,
                    position: "left"
                }
            },
            data: {
                labels: labels,
                datasets: [
                    {
                        data: tempData,
                        backgroundColor: this.state.viewType === 'line' ? ['rgba(157,248,139,0.5)'] : chartColors,
                    }
                ],
            },
        });
    }

    tableHeaderHandleClick(event) {
        const id = event.target.id
        console.log(id)
        let presentYears = this.state.yearsForPieChart;
        if (presentYears.includes(id)) presentYears.splice(presentYears.indexOf(id), 1);
        else {
            if (presentYears.length === 3) presentYears.shift();
            presentYears.push(id);
        }
        console.log(presentYears)
        this.setState({
            yearsForPieChart: presentYears
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
                    <td>{details.StateName}</td>
                    {this.state.years.map(
                        (year, index1) =>
                            <td key={index1}>{details[year]}</td>
                    )}
                </tr>
        )

        let canvasList = [];
        let title = "";

        for (let i = 0; i < this.state.yearsForPieChart.length; i++) {
            title = title + this.state.yearsForPieChart[i] + ", "

            canvasList.push(
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

        let mapping = [];

        for (let i = 0; i < this.state.labels.length; i++) {
            let temp = []
            for (let key in this.state.labels[i]) {
                temp.push(
                    <div className="labelMapping">
                        <span style={{backgroundColor: this.state.labels[i][key]}} className="dot"/> &nbsp; {key}
                    </div>
                )
            }
            mapping.push(temp)
        }


        return (
            <div className="main_content">
                <div className="Graph">
                    <div>
                        {canvasList}
                    </div>
                    <h1 style={{color: "#4b4559"}}>{this.state.name}</h1>
                    <h3 style={{color: "rgb(99 99 99)"}}>(Years: {title})</h3>
                </div>
                <div className="mapping">
                    {/*{mapping}*/}
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