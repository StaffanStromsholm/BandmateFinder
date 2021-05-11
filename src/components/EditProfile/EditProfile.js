//React
import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { useForm } from "react-hook-form";

//Material UI
import Avatar from '@material-ui/core/Avatar';
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Container from "@material-ui/core/Container";
import { createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { ThemeProvider } from "@material-ui/styles";
import Typography from '@material-ui/core/Typography';

//Misc
import { instruments, skillLevels, citiesInFinland } from "../../constants";
import * as api from "../../api/index.js";

//styles
import styles from "./EditProfile.module.scss";

//Material-UI dark theme
const theme = createMuiTheme({
    palette: {
        type: "dark",
    },
});

//Material-UI styles
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: "#cc0066",
        color: "white"
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const EditProfile = ({loggedInUser, setToken, setUserHook}) => {
    //state
    const [user, setUser] = useState('');
    const [updatedUser, setUpdatedUser] = useState();
    const [infoMissing, setInfoMissing] = useState()
    const [error, setError] = useState();

    const handleLookingForChange = (event) => {
        setCheckedState({
            ...checkedState,
            [event.target.name]: event.target.checked,
        });
        setUser({ ...user, lookingFor: { bands, jams, studioWork, songWriting } })
    };

    const [checkedState, setCheckedState] = useState({
        bands: false,
        jams: false,
        songWriting: false,
        studioWork: false,
    });

    const { bands, jams, songWriting, studioWork } = checkedState;

    //Hooks
    const classes = useStyles();
    const history = useHistory();
    const { register, handleSubmit } = useForm();

    //functions
    const onChangeHandler = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
        setInfoMissing(false);
        setError(false);
    }

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        setToken("");
        setUser("");
        history.push("/BandmateFinder-client/login");
    };

    const submitData = async() => {
        console.log(user);

        await api.updateUser(user._id, user)
            .then(response => {
                handleLogout();
                history.push('/BandmateFinder-client/login')
            })
            .catch(error => setError(error.message))
    };

    useEffect(() => {
        api.fetchUser(loggedInUser)
        .then(response => setUser(response.data))
    }, [])
//wait for the arrays to get read
    if(!user.primaryInstrument || !user.city || !user.skillLevel || !user.lookingFor)return null;

    return (
        <div className={styles.EditProfile}>

            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">

                    <CssBaseline />
                    <Link className={styles.back} to='/BandmateFinder-client'><i className="fas fa-chevron-left"></i></Link>

                    <div className={classes.paper}>

                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>

                        <Typography component="h1" variant="h5">
                            Edit Profile
                        </Typography>

                        <form
                            noValidate
                            onSubmit={handleSubmit((data) => submitData(data))}
                        >

                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                autoFocus
                                onChange={onChangeHandler}
                                value={user.username}
                            />

                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="email"
                                label="Email for contacting you"
                                type="email"
                                id="email"
                                onChange={onChangeHandler}
                                value={user.email}
                            />

                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="city"
                                select
                                name="city"
                                label="City"
                                type="text"
                                onChange={onChangeHandler}
                                value={user.city}
                            >
                                {citiesInFinland.map((city, index) => (
                                    <MenuItem key={index} value={city}>
                                        {city}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="postalCode"
                                label="Postal Code"
                                type="text"
                                id="postalCode"
                                autoComplete="postalCode"
                                onChange={onChangeHandler}
                                value={user.postalCode}
                            />

                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="mainInstrument"
                                select
                                name="primaryInstrument"
                                label="Instrument"
                                type="text"
                                onChange={onChangeHandler}
                                helperText="Please select your main instrument"
                                value={user.primaryInstrument}
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
                                name="skillLevel"
                                label="Skill Level"
                                type="text"
                                onChange={onChangeHandler}
                                value={user.skillLevel}
                            >
                                {skillLevels.map((skillLevel, index) => (
                                    <MenuItem key={index} value={skillLevel}>
                                        {skillLevel}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <FormControl
                                required
                                component="fieldset"
                                className={classes.formControl}
                            >
                                <FormLabel component="legend">
                                    I'm looking for
                                </FormLabel>

                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={bands}
                                                onChange={
                                                    handleLookingForChange
                                                }
                                                name="bands"
                                            />
                                        }
                                        label="Bands"
                                    />

                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={jams}
                                                onChange={
                                                    handleLookingForChange
                                                }
                                                name="jams"
                                            />
                                        }
                                        label="Jams"
                                    />

                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={songWriting}
                                                onChange={
                                                    handleLookingForChange
                                                }
                                                name="songWriting"
                                            />
                                        }
                                        label="Song writing"
                                    />

                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={studioWork}
                                                onChange={
                                                    handleLookingForChange
                                                }
                                                name="studioWork"
                                            />
                                        }
                                        label="Studio work"
                                    />

                                </FormGroup>

                            </FormControl>

                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                name="freeText"
                                fullWidth
                                placeholder="Write something about yourself"
                                multiline
                                label="Write about yourself"
                                rows={5}
                                rowsMax={10}
                                onChange={onChangeHandler}
                                inputRef={register}
                                value={user.freeText}
                            />
                            {error && <p className={styles.error}>Something went wrong, please try again</p>}

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Edit
                            </Button>
                            
                        </form>
                    </div>
                </Container>
            </ThemeProvider>
        </div>
    );
};

export default EditProfile;