import React, { useState, useEffect } from 'react'
import { fetchDailyCovidData } from "../../api/index"
import { Line } from "react-chartjs-2";
import styles from "./Chart.module.css";

export const Chart = () => {

    const [dailyCovidData, setDailyCovidData] = useState({});
    useEffect(() => {
        const fetchCovidData = async () => {
            setDailyCovidData(await fetchDailyCovidData());
        }
        fetchCovidData();
    }, []);
    const lineChart = (
        dailyCovidData.length ? (
            <Line
                data={{
                    labels: dailyCovidData.map(({ date }) => date),
                    datasets: [{
                        data: dailyCovidData.map(({ confirmed }) => confirmed),
                        label: 'Infected',
                        borderColor: "2E2EFA",
                        fill: true
                    }, {
                        data: dailyCovidData.map(({ deaths }) => deaths),
                        label: 'Deaths',
                        borderColor: "red",
                        backgroundColor: 'rgba(250,0,0,0.5)',
                        fill: true
                    }]
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
