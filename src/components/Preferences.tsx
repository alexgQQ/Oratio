import React from 'react';

import {
  makeStyles,
  createStyles,
  MuiThemeProvider,
} from '@material-ui/core/styles';
import { Grid, Slider, Typography } from '@material-ui/core';
import { VolumeDown, VolumeUp } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import * as Theme from './Theme';
import FontSizeSlider from './settings/FontSizeSlider';
import FontColorPicker from './settings/FontColorPicker';
import FontBoldSlider from './settings/FontBoldSlider';
import AudioSelector from './settings/AudioSelector';

const theme = Theme.default();
const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
      background: theme.palette.background.default,
      color: 'white',
      height: '100vh',
      padding: theme.spacing(4),
    },
    content: {
      padding: theme.spacing(4),
    },
    text: {
      color: 'white',
      fontSize: '3rem',
      textAlign: 'center',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: '100%',
    },
  })
);

export default function Preferences() {
  const [volume, setVolume] = React.useState<number>(
    parseInt(localStorage.getItem('volume') || '25', 10)
  );
  const [textSpeed, setTextSpeed] = React.useState<number>(
    parseInt(localStorage.getItem('textSpeed') || '75', 10)
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleVolumeChange = (_event: any, newValue: number | number[]) => {
    setVolume(newValue as number);
    localStorage.setItem('volume', newValue.toString());
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleTextSpeedChange = (_event: any, newValue: number | number[]) => {
    setTextSpeed(newValue as number);
    localStorage.setItem('textSpeed', newValue.toString());
  };

  const classes = useStyles();
  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <div className={classes.content}>
          <form
            noValidate
            autoComplete="off"
            // onSubmit={handleSpeechSendClicked}
          >
            <Grid container direction="row" spacing={3}>
              <Grid item xs={6}>
                <AudioSelector />
              </Grid>
              <Grid item xs={6}>
                <Typography id="continuous-slider" gutterBottom>
                  Volume
                </Typography>
                <Grid container spacing={3}>
                  <Grid item>
                    <VolumeDown />
                  </Grid>
                  <Grid item xs>
                    <Slider
                      value={volume}
                      onChange={handleVolumeChange}
                      aria-labelledby="continuous-slider"
                      valueLabelDisplay="on"
                    />
                  </Grid>
                  <Grid item>
                    <VolumeUp />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Typography id="continuous-slider" gutterBottom>
                  Text Speed
                </Typography>
                <Grid container spacing={3}>
                  <Grid item>
                    <VolumeDown />
                  </Grid>
                  <Grid item xs>
                    <Slider
                      value={textSpeed}
                      onChange={handleTextSpeedChange}
                      aria-labelledby="continuous-slider"
                      valueLabelDisplay="on"
                      max={100}
                    />
                  </Grid>
                  <Grid item>
                    <VolumeUp />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <FontSizeSlider />
              </Grid>
              <Grid item xs={6}>
                <FontColorPicker />
              </Grid>
              <Grid item xs={6}>
                <FontBoldSlider />
              </Grid>
            </Grid>
            <Link to="/home">Home</Link>
          </form>
        </div>
      </div>
    </MuiThemeProvider>
  );
}
