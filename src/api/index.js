import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) => {
    let changeableUrl = url;
    if(country) {
        changeableUrl = `${url}/countries/${country}`
    }
    try {
        const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(changeableUrl);
        const modifiedCovidData = { confirmed, recovered, deaths, lastUpdate }
        return modifiedCovidData;
    }
    catch (error) {

    }
};

export const fetchDailyCovidData = async () => {
    try {
        const {data} = await axios.get(`${url}/daily`);
        const modifiedCovidData = data.map((dailyData) => ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate
        }))
        return modifiedCovidData;
    }
    catch(error) {
        console.log(error)
    }
}

export const covidCountries = async () => {
    try {
        const {data: {countries}} = await axios.get(`${url}/countries`);
        return countries.map((country) => country.name);
    } catch(error) {

    }
}

export const fetchCovidData = async () => {
    const url = "https://corona.lmao.ninja/v2/countries";
    const {data} = await axios.get(url);
    const modifiedCovidData = [];
    data.map((country) => (
        modifiedCovidData.push({
            state: country.country,
            confirmed: country.cases,
            countryInfo: country.countryInfo, 
        })
    ))
    return modifiedCovidData;

}