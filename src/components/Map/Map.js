import React from 'react'
import GoogleMapReact from 'google-map-react'

export const Map = ({ data }) => {
    const markers = data.map((country,i) => {
        return (
            <div
                lat={country.countryInfo.lat}
                lng={country.countryInfo.long}
                style={{
                    color: "red",
                    backgroundColor: "#FFF",
                    height: "50px",
                    width: "50px",
                    textAlign: "center",
                    borderRadius: "30%",
                }}
            >
                <img src={country.countryInfo.flag} height="10px" alt="abcd" />
                <br />
                {country.countryInfo.iso3}
                <br />
                {country.confirmed}</div>
        )
    })
    return (
        <div style={{ height: "100vh", width: "100%" }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyDoZ6NODMb5ImzMV6nYMcOVC4UUcF1SBuQ" }}
                defaultCenter={{ lat: 30, lng: 70.33 }}
                defaultZoom={4}
            >
                {markers}
            </GoogleMapReact>
        </div>
    )
}
