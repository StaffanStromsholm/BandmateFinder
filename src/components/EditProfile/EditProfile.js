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
    const [instrument, setInstrument] = useState();
    const [skillLevel, setSKillLevel] = useState("");
    const [city, setCity] = useState();
    const [checkedState, setCheckedState] = useState({
        bands: false,
        jams: false,
        songWriting: false,
        studioWork: false,
    });
    const [freeText, setFreeText] = useState("");
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleLookingForChange = (event) => {
        setCheckedState({
            ...checkedState,
            [event.target.name]: event.target.checked,
        });
    };

    const { bands, jams, songWriting, studioWork } = checkedState;

    const handleInstrumentChange = (event) => {
        setInstrument(event.target.value);
        console.log(event.target.value);
    };

    const handleCityChange = (event) => {
        setCity(event.target.value);
    };

    const handleSkillLevelChange = (event) => {
        setSKillLevel(event.target.value);
        console.log(event.target.value);
    };

    const handleBioChange = (e) => {
        setFreeText(e.target.value);
    };

    const submitData = (data) => {
        if (data.password !== data.confirmPassword) return;

        const lookingFor = { bands, jams, studioWork, songWriting };
        data.primaryInstrument = instrument;
        data.skillLevel = skillLevel;
        data.lookingFor = lookingFor;
        data.freeText = freeText;
        data.city = city;

        api.updateUser(user._id, data).then((response) => {
            console.log(response);
            history.push("/BandmateFinder-client/search");
        });
    };

    useEffect(() => {
        setIsLoading(true);
        const user = localStorage.getItem("user");
        const parsedUser = JSON.parse(user);

        api.fetchUser(parsedUser)
            .then((response) => setUser(response.data))
            .then(() => {
                setIsLoading(false);
                setInstrument(user.primaryInstrument);
            });
    }, []);

    if (isLoading || !user)
        return <h1 className={styles.EditProfile}>Loading...</h1>;

    return (
        <div className={styles.EditProfile}>
            <h1>Edit Profile</h1>
            <img src={user.photo} />
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
                                defaultValue={user.username}
                            />

                            <TextField
                                variant="outlined"
                                margin="normal"
                                inputRef={register}
                                required
                                fullWidth
                                id="city"
                                select
                                //set value to user.skillLevel when rendered first time
                                value={city || user.city}
                                name="city"
                                label="City"
                                type="text"
                                onChange={handleCityChange}
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
                                inputRef={register}
                                required
                                fullWidth
                                name="postalCode"
                                label="Postal Code"
                                type="text"
                                id="postalCode"
                                autoComplete="postalCode"
                                defaultValue={user.postalCode}
                            />

                            <TextField
                                variant="outlined"
                                margin="normal"
                                inputRef={register}
                                required
                                fullWidth
                                id="mainInstrument"
                                select
                                value={instrument || user.primaryInstrument}
                                name="instrument"
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
                                //set value to user.skillLevel when rendered first time
                                value={skillLevel || user.skillLevel}
                                name="skillLevel"
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
                                variant=""
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
                                onChange={handleBioChange}
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
