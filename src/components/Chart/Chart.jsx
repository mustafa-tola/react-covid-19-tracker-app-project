import React, { useState, useEffect } from 'react'
import axios from "axios";
// import { fetchDailyCovidData } from "../../api/index"
import { Line, Bar } from "react-chartjs-2";
import styles from "./Chart.module.css";

export const Chart = ({ data, country }) => {
    // const [dailyCovidData, setDailyCovidData] = useState({});
    const lineChart = (
        data.length ? (
            <Line
                data={{
                    labels: data.map(({ date }) => date),
                    datasets: [{
                        data: data.map(({ confirmed }) => confirmed),
                        label: 'Infected',
                        borderColor: "rgba(0,0,255,0.5)",
                        backgroundColor: "rgba(153, 255, 255,0.5)",
                        fill: true
                    }, {
                        data: data.map(({ deaths }) => deaths),
                        label: 'Deaths',
                        borderColor: "rgba(250,0,0.5)",
                        backgroundColor: 'rgb(255, 51, 51,0.6)',
                        fill: true
                    }, {
                        data: data.map(({ recovered }) => recovered),
                        label: 'Recovered',
                        borderColor: "rgba(0,255,0,0.5)",
                        backgroundColor: 'rgba(204, 255, 204,0.9)',
                        fill: true,
                    }
                    ]
                }}
            />
        )
            : null
    )
    return (
        <div className={styles.container}>
            {lineChart}
        </div>
    )
}
