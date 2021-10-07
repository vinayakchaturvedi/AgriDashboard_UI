import React, {Component} from "react";
import "../App.css";
import SideBar from "./SideBar";
import NavBar from "./NavBar";
import {Chart} from "react-chartjs-2";

class LandingPage extends Component {

    constructor() {
        super();
        this.state = {
            KharifProd: {},
            years: ["2014-15", "2015-16", "2016-17", "2017-18", "2018-19"],
            isLoading: true
        }

        this.updateLoad = this.updateLoad.bind(this);
        this.createChart = this.createChart.bind(this);
        this.getRandomColor = this.getRandomColor.bind(this);
    }

    async componentDidMount() {

        this.setState({
            KharifProd: await require('./Kharif_Prod.json')
        }, () => this.updateLoad())


    }

    updateLoad() {
        this.setState({isLoading: false},
            () => this.createChart()
        )
    }

    getRandomColor() {
        let letters = '0123456789ABCDEF'.split('');
        let color = '#';
        for (let i = 0; i < 6; i++ ) {
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

            for (let i = 0; i < this.state.KharifProd.result.length; i++) {
                let obj = this.state.KharifProd.result[i]
                tempData.push(obj["2014-15"])
                chartColors.push(this.getRandomColor())
                labels.push(obj.StateName)
            }

            let currPieChart = new Chart(ctx, {
                type: 'pie',
                options: {
                    legend :{
                        position: 'right'
                    },
                    title: {
                        display: true,
                        fontColor: 'rgb(71,37,37)',
                        fontSize: 26,
                        text: "Kharif Crop",
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

        let years = this.state.years.map(
            (year, index) =>
                <th
                    key={index}
                >{year}</th>
        )

        let content = this.state.KharifProd.result.map(
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
            <div className="LandingPage">
                <NavBar/>
                <SideBar/>

                <div className="main_content">
                    <div className="Graph">Welcome!! Have a nice day.
                        <div>
                            <div style={{width: "20%", height: "20%", display: "inline-block"}}>
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


            </div>
        )
    }

}

export default LandingPage