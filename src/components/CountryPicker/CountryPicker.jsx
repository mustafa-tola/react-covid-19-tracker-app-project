import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl } from "@material-ui/core";
import styles from "./CountryPicker.module.css";
import { covidCountries } from "../../api/index";

const CountryPicker = ({ handleCovidCountryChange }) => {
    const [ fetchedCovidCountries, setFetchedCovidCountries ] = useState([]);
    useEffect(() => {
        const fetchCovidCountries = async () => {
            setFetchedCovidCountries(await covidCountries());
        }
        fetchCovidCountries();
    },[]);
    return (
        <FormControl className={styles.formControl}>
            <NativeSelect defaultValue="" onChange={(e) =>{handleCovidCountryChange(e.target.value)}}>
                <option value="global">Global</option>
                    {fetchedCovidCountries.map((country,i) => <option key={i} value={country}>{country}</option> )}
            </NativeSelect>
        </FormControl>
    )
}

export { CountryPicker };
