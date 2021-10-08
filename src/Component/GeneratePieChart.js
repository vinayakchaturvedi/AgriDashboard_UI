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
            name: props.name
        }

        this.createChart = this.createChart.bind(this);
        this.getRandomColor = this.getRandomColor.bind(this);
        this.loadYears = this.loadYears.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        this.setState({
            dataset: nextProps.dataset,
            years: [],
            isLoading: true,
            name: nextProps.name
        }, () => this.loadYears());
    }

    loadYears() {
        let givenYears = []

        for (let key in this.state.dataset.result[0]) {
            if (key !== 'StateName' && key !== '_id')
                givenYears.push(key)
        }

        this.setState({
                isLoading: false,
                years: givenYears
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
        if (document.getElementById("PieChart") !== null) {
            let ctx = document.getElementById("PieChart").getContext('2d');
            let chartColors = [];
            let labels = [];
            let tempData = [];

            for (let i = 0; i < this.state.dataset.result.length; i++) {
                let obj = this.state.dataset.result[i]
                tempData.push(obj["2014-15"])
                chartColors.push(this.getRandomColor())
                labels.push(obj.StateName)
            }

            let currPieChart = new Chart(ctx, {
                type: 'pie',
                options: {
                    legend: {
                        position: 'right',
                        align: 'end'
                    },
                    title: {
                        display: true,
                        fontColor: 'rgb(71,37,37)',
                        fontSize: 26,
                        text: this.state.name,
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

    render() {

        if (this.state.isLoading) {
            return (
                <div/>
            )
        }

        console.log("Child Name: ", this.state.name)

        let years = this.state.years.map(
            (year, index) =>
                <th
                    key={index}
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


        return (
            <div className="main_content">
                <div className="Graph">
                    <div>
                        <div style={{width: "50%"}}>
                            <canvas
                                id={"PieChart"}
                            />
                        </div>
                    </div>
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