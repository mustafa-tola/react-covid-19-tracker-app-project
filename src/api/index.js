import axios from 'axios';

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