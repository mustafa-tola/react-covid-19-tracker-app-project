import React, { useState, useEffect } from "react";
import { NativeSelect, FormControl } from "@material-ui/core";
import styles from "./CountryPicker.module.css";

const CountryPicker = ({ handleCovidCountryChange }) => {
  const [fetchedCovidCountries, setFetchedCovidCountries] = useState([]);
  useEffect(() => {
    async function getData() {
      const response = await fetch(
        "https://api.thevirustracker.com/free-api?countryTotals=ALL"
      );
      let data = await response.json();
      data = Object.values(Object.values(data.countryitems)[0]);
      const covidData = [];

      data.map(data2 => {
        if (data2.code) {
          covidData.push({
            title: data2.title,
            code: data2.code
          });
        }
      });
      setFetchedCovidCountries(covidData);
    }
    getData();
  }, []);
  return (
    <FormControl className={styles.formControl}>
      <NativeSelect
        defaultValue=""
        onChange={e => {
          handleCovidCountryChange(e.target.value);
        }}
      >
        <option value="global">Global</option>
        {fetchedCovidCountries.map((country, i) => (
          <option key={i} value={country.code}>
            {country.title}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};

export { CountryPicker };
