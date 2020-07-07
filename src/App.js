import React, { useEffect, useState } from "react";
import { Cards } from "./components/Cards/Cards";
import { Chart } from "./components/Chart/Chart";
import { CountryPicker } from "./components/CountryPicker/CountryPicker";
import { Map } from "./components/Map/Map";
import { Header } from "./components/Header/Header";
import styles from "./App.module.css";
import { fetchCovidData } from "./api";
import axios from "axios";

function App() {
  const [globalData, setGlobalData] = useState([]);
  const [covidCountry, setCovidCountry] = useState("global");
  const [covidChartData, setCovidChartData] = useState({});
  const [covidData2, setCovidData2] = useState([]);
  const [collectedCovidData, setCollectedCovidData] = useState(false);
  const handleCovidCountryChange = async country => {
    setCovidCountry(country);
    if (JSON.stringify(country) !== "global") {
      async function getData() {
        const response = await fetch(`https://api.thevirustracker.com/free-api?countryTotal=${country}`);
        const { countrydata } = await response.json();
        const covidData = {
          confirmed: countrydata[0].total_cases,
          recovered: countrydata[0].total_recovered,
          deaths: countrydata[0].total_deaths,
        }
        setGlobalData(covidData);
      }
      async function getChartData() {
        const response = await fetch(`https://api.thevirustracker.com/free-api?countryTimeline=${country}`);
        const { timelineitems } = await response.json();
        const keys = Object.keys(timelineitems["0"]);
        const covidData = [];
        keys.map(key => {
          return covidData.push({
            confirmed: timelineitems["0"][key]["new_daily_cases"],
            deaths: timelineitems["0"][key]["new_daily_deaths"],
            recovered: timelineitems["0"][key]["total_recoveries"],
            date: key,
          })
        });
        setCovidChartData(covidData);
      };
      getData();
      getChartData();
    } else {
      async function getData() {
        const response = await fetch(
          "https://api.thevirustracker.com/free-api?global=stats"
        );
        const { results } = await response.json();
        const covidData = {
          confirmed: results[0].total_cases,
          recovered: results[0].total_recovered,
          deaths: results[0].total_deaths,
        }
        setGlobalData(covidData);
      }
      async function getChartData() {
        const { data } = await axios.get(`https://covid19.mathdro.id/api/daily`);
        const modifiedCovidData = data.map((dailyData) => ({
          confirmed: dailyData.confirmed.total,
          deaths: dailyData.deaths.total,
          date: dailyData.reportDate
        }))
        setCovidChartData(modifiedCovidData);
      }
      getData();
      getChartData();
    }
  }
  async function fetchCollectiveCovidData() {
    const fetchedCovidData = await fetchCovidData();
    setCovidData2(fetchedCovidData);
  }
  fetchCollectiveCovidData();

  useEffect(() => {
    async function fetchGlobalData() {
      const response = await fetch(
        "https://api.thevirustracker.com/free-api?global=stats"
      );
      const { results } = await response.json();
      const covidData = {
        confirmed: results[0].total_cases,
        recovered: results[0].total_recovered,
        deaths: results[0].total_deaths,
      }
      setGlobalData(covidData);
      setCollectedCovidData(true)
    }
    async function getChartData() {
      const { data } = await axios.get(`https://covid19.mathdro.id/api/daily`);
      const modifiedCovidData = data.map((dailyData) => ({
        confirmed: dailyData.confirmed.total,
        recovered: dailyData.recovered.total,
        deaths: dailyData.deaths.total,
        date: dailyData.reportDate
      }))
      setCovidChartData(modifiedCovidData);
      setCollectedCovidData(true);
    }
    if (collectedCovidData === false) {
      fetchGlobalData();
      getChartData();
    }
  }, [globalData, covidChartData,collectedCovidData]);
  return (
    <div className={styles.container}>
      <Header />
      <Cards country={covidCountry} data={globalData} />
      <CountryPicker handleCovidCountryChange={handleCovidCountryChange} />
      <Chart data={covidChartData} country={covidCountry} />
      <Map data={covidData2} />
    </div>
  );
}

export default App;