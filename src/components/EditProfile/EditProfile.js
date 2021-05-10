//React
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

//Material UI
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

//Components
import Loader from '../UI/Animation/Loader.js';

//Misc
import { instruments, skillLevels, citiesInFinland } from "../../constants";
import * as api from "../../api/index.js";

//styles
import styles from "./EditProfile.module.scss";

const theme = createMuiTheme({
    palette: {
        type: "dark",
    },
});

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
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const EditProfile = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const { register, handleSubmit } = useForm();
    const [checkedState, setCheckedState] = useState({
        bands: false,
        jams: false,
        songWriting: false,
        studioWork: false,
    });
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [updatedUser, setUpdatedUser] = useState(user);

    const handleLookingForChange = (event) => {
        setCheckedState({
            ...checkedState,
            [event.target.name]: event.target.checked,
        });
        setUpdatedUser({...updatedUser, lookingFor: {bands, jams, studioWork, songWriting}})
    };

    const { bands, jams, songWriting, studioWork } = checkedState;

    const onChangeHandler = (e) => {
        setUpdatedUser({...updatedUser, [e.target.name]: e.target.value})
    }

    const submitData = () => {
        if(!data.username || !data.password || !data.confirmPassword || !data.email || !data.city || !data.postalCode || !data.primaryInstrument || !data.lookingFor || !data.freeText){
            setInfoMissing(true);
            return;
          }
        
        console.log(updatedUser);

        api.createUser(data)
        .then(response => history.push('/BandmateFinder-client/login'))
        .catch(error => console.log(error))
    };

    useEffect(() => {
        setIsLoading(true);
        const user = localStorage.getItem("user");
        const parsedUser = JSON.parse(user);

        api.fetchUser(parsedUser)
            .then((response) => setUser(response.data))
            .then(() => {
                setIsLoading(false);
                // setInstrument(user.primaryInstrument);
            });
    }, []);

    if (isLoading || !user) return <Loader />;

    return (
        <div className={styles.EditProfile}>
            <h1>Edit Profile</h1>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div>
                        <form
                            noValidate
                            onSubmit={handleSubmit((data) => submitData(data))}
                        >
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
                                defaultValue={user.username || ''}
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
            name="contactEmail"
            label="Email for contacting you"
            type="contactEmail"
            id="contactEmail"
            onChange={handleContactEmail}
          />

                            <TextField
                                variant="outlined"
                                margin="normal"
                                inputRef={register}
                                required
                                fullWidth
                                id="city"
                                select
                                name="city"
                                label="City"
                                type="text"
                                onChange={onChangeHandler}
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
                                // inputRef={register}
                                required
                                fullWidth
                                name="postalCode"
                                label="Postal Code"
                                type="text"
                                id="postalCode"
                                autoComplete="postalCode"
                                onChange={onChangeHandler}
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
                                //set value to user.skillLevel when rendered first time
                                name="skillLevel"
                                label="Skill Level"
                                type="text"
                                onChange={onChangeHandler}
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
                                label="Write about yourself, genres you play, your bands, your gear"
                                rows={5}
                                rowsMax={10}
                                onChange={onChangeHandler}
                                inputRef={register}
                                defaultValue={user.freeText}
                            />

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
