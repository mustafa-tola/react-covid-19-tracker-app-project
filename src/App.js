import React, { useEffect, useState } from 'react';
import { Cards } from "./components/Cards/Cards";
import { Chart } from "./components/Chart/Chart";
import { CountryPicker } from "./components/CountryPicker/CountryPicker";
import { Map } from "./components/Map/Map";
import styles from "./App.module.css"
import { fetchData,fetchCovidData } from "./api";


function App() {
  const [covidData, setCovidData] = useState({});
  const [covidCountry, setCovidCountry] = useState('');
  const [covidData2,setCovidData2] = useState([])
  const handleCovidCountryChange = async (country) => {
    const fetchedCovidData = await fetchData(country);
    setCovidData(fetchedCovidData);
    setCovidCountry(country);
  }
  useEffect(() => {
    async function collectingData() {
      const fetchedCovidData = await fetchData();
      setCovidData(fetchedCovidData);
    }
    async function fetchCollectiveCovidData() {
      const fetchedCovidData = await fetchCovidData();
      setCovidData2(fetchedCovidData);
    }
    collectingData();
    fetchCollectiveCovidData();
  }, []);
  return (
    <div className={styles.container}>
      <Cards data={covidData} />
      <CountryPicker handleCovidCountryChange={handleCovidCountryChange} />
      <Chart data={covidData} country={covidCountry}/>
      <Map data={covidData2}/>
    </div>
  );
}

export default App;
