import React, { useState} from 'react';
import {Link} from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme } from "@material-ui/core/styles";
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { ThemeProvider } from "@material-ui/styles";
import PropTypes from 'prop-types';
import styles from './auth.module.scss';

const theme = createMuiTheme({
  palette: {
      type: "dark",
  },
});

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


const Login = ({setToken, setUser}) => {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();
  const [login, setLogin] = useState({username: '', password: ''})
  const [error, setError] = useState(null);
  const history = useHistory();

  const loginUser = async(credentials) => {
  return fetch('https://bmf-backend.herokuapp.com/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
    .catch(error => setError(error))
 }

 const onChangeHandler = (e) => {
  setLogin({...login, [e.target.name]: e.target.value})
  setError(false);
 }

  const submitData = async() => {
    const token = await loginUser(login);
    if(!token) return

    setToken(token);
    setUser(token.user)
    history.push('/BandmateFinder-client/search');
  }

  return (
    <ThemeProvider theme={theme}>

    <Container component="main" maxWidth="xs">

      <CssBaseline />
      <Link className={styles.back} to='/BandmateFinder-client'><i className="fas fa-chevron-left"></i></Link>
      <div className={classes.paper}>
       

        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          {!error && 'Login'} {error && <p className={styles.error}>Something went wrong, please try again</p>}
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
            onChange={onChangeHandler}
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
            onChange={onChangeHandler}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Login
          </Button>

          <Grid container>
            <Grid item>

              <Link className={styles.loginLink} to="/BandmateFinder-client/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>

            </Grid>
          </Grid>

        </form>

      </div>
      
    </Container>
    </ThemeProvider>
  );
}

export default Login;

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
}