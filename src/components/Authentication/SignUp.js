import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { instruments, skillLevels } from '../../config';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#cc0066',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp = props => {
  const endpoit = 'http://localhost:5000/register'
  const classes = useStyles();
  const { history } = props;
  const { register, handleSubmit } = useForm();
  const [instrument, setInstrument] = useState('');
  const [skillLevel, setSKillLevel] = useState('');
  const [checkedState, setCheckedState] = useState({
    bands: false,
    jams: false,
    songWriting: false,
    studioWork: false,
  });
  const [freeText, setFreeText] = useState('');

  const handleLookingForChange = (event) => {
    setCheckedState({ ...checkedState, [event.target.name]: event.target.checked });
  };

  const { bands, jams, songWriting, studioWork } = checkedState;

  const handleInstrumentChange = (event) => {
    setInstrument(event.target.value);
    console.log(event.target.value)
  };

  const handleSkillLevelChange = (event) => {
    setSKillLevel(event.target.value);
    console.log(event.target.value)
  };

  const handleBioChange = (e) => {
    setFreeText(e.target.value);
  }

  const submitData = (data) => {
    const lookingFor = { bands, jams, studioWork, songWriting}
    data.primaryInstrument = instrument;
    data.skillLevel = skillLevel;
    data.lookingFor = lookingFor;
    data.freeText = freeText;

    axios.post(endpoit, data)
    .then(response => {
      history.push('/login')
    })
    .catch(error => console.log(error))
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit((data) => submitData(data))}>
          
          <TextField
            variant="outlined"
            margin="normal"
            inputRef={register}
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            inputRef={register}
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <TextField
            variant="outlined"
            margin="normal"
            inputRef={register}
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            autoComplete="current-password"
          />
          <TextField
            variant="outlined"
            margin="normal"
            inputRef={register}
            required
            fullWidth
            name="city"
            label="City"
            type="text"
            id="city"
            autoComplete="city"
          />
          <TextField
          variant="outlined"
          margin="normal"
          inputRef={register}
          required
          fullWidth
          id="mainInstrument"
          select
          value={instrument}
          name= "instrument"
          label="Instrument"
          type="text"
          onChange={handleInstrumentChange}
          helperText="Please select your main instrument"
        >
          {Object.keys(instruments).map((key, index) => (
            <MenuItem key={index} value={key}>
              {key}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          variant="outlined"
          margin="normal"
          inputRef={register}
          required
          fullWidth
          id="skillLevel"
          select
          value={skillLevel}
          name= "skillLevel"
          label="Skill Level"
          type="text"
          onChange={handleSkillLevelChange}
        >
          {skillLevels.map((skillLevel, index) => (
            <MenuItem key={index} value={skillLevel}>
              {skillLevel}
            </MenuItem>
          ))}
        </TextField>

        <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">I'm looking for</FormLabel>
        <FormGroup>
            <FormControlLabel
            control={<Checkbox checked={bands} onChange={handleLookingForChange} name='bands' />}
            label='Bands'
            />
             <FormControlLabel
            control={<Checkbox checked={jams} onChange={handleLookingForChange} name='jams' />}
            label='Jams'
            />
             <FormControlLabel
            control={<Checkbox checked={songWriting} onChange={handleLookingForChange} name='songWriting' />}
            label='Song writing'
            />
             <FormControlLabel
            control={<Checkbox checked={studioWork} onChange={handleLookingForChange} name='studioWork' />}
            label='Studio work'
            />
        </FormGroup>
      </FormControl>

      <TextField  variant=''
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  placeholder='Write something about yourself'
                  multiline
                  rows={5}
                  rowsMax={10}
                  onChange={handleBioChange}
                  inputRef={register}
      />



          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign up
          </Button>
          <Grid container>
            
            <Grid item>
              <Link href="/login" variant="body2">
                {"Already have an account? Login"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default withRouter(SignUp);