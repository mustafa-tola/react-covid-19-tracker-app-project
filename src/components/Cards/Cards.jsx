import React from "react";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import styles from "./Cards.module.css";
import CountUp from "react-countup";
import cx from "classnames";

export const Cards = ({ data,country }) => {
  if (!data.confirmed) {
    return "Loading....";
  }
  return (
    <div className={styles.container}>
      {country ? <h1>{country} Covid Stats</h1>: <h1>Global Corona Stats</h1>}
      <Grid container spacing={3} justify="center">
        <Grid
          item
          component={Card}
          xs={12}
          md={3}
          className={cx(styles.card, styles.infected)}
        >
          <CardContent>
            <Typography color="textPrimary" gutterBottom>
              Infected
            </Typography>
            <Typography variant="h5" className={styles.infectedCount}>
              <CountUp
                start={0}
                end={data.confirmed}
                duration={2.5}
                separator=","
              />
            </Typography>
            <Typography variant="body2">
              No of Active Cases of COVID-19
            </Typography>
          </CardContent>
        </Grid>
        <Grid
          item
          component={Card}
          xs={12}
          md={3}
          className={cx(styles.card, styles.recovered)}
        >
          <CardContent>
            <Typography color="textPrimary" gutterBottom>
              Recovered
            </Typography>
            <Typography variant="h5" className={styles.recoveredCount}>
              <CountUp
                start={0}
                end={data.recovered}
                duration={2.5}
                separator=","
              />
            </Typography>
            <Typography variant="body2">
              No of Recoveries of COVID-19
            </Typography>
          </CardContent>
        </Grid>
        <Grid
          item
          component={Card}
          xs={12}
          md={3}
          className={cx(styles.card, styles.deaths)}
        >
          <CardContent>
            <Typography color="textPrimary" gutterBottom>
              Deaths
            </Typography>
            <Typography variant="h5" className={styles.deathsCount}>
              <CountUp
                start={0}
                end={data.deaths}
                duration={2.5}
                separator=","
              />
            </Typography>
            <Typography variant="body2">
              No of Deaths caused by COVID-19
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </div>
  );
};
