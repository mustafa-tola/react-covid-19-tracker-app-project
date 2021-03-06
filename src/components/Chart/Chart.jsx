import React from 'react'
import { Line } from "react-chartjs-2";
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
