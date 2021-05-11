import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styles from './CreateComments.module.scss';
import * as api from '../../../api/index.js';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { useHistory } from 'react-router-dom';

const theme = createMuiTheme({
    palette: {
      type: "dark"
    }
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
        backgroundColor: '#cc0066',
    },
    submit: {
        margin: theme.spacing(0, 0, 0),
    },
}));

export default function CreateComment({ user }) {
    const [comment, setComment] = useState({ text: '' });
    const [loggedInUser, setLoggedInUser] = useState();
    const history = useHistory();

    const classes = useStyles();


    const onChangeHandler = (e) => {
        setComment({ text: e.target.value });
    }

    const submitHandler = (e) => {
        console.log(loggedInUser);
        e.preventDefault();
        const author = sessionStorage.getItem('user')
        axios.post(`https://bmf-backend.herokuapp.com/users/${user._id}/comments`, { comment, commentReceiverId: user._id, authorId: loggedInUser._id, authorUsername: loggedInUser.username })
        //refresh the page by first pushing root url then current url with slight delay
        .then(() => history.push('/BandmateFinder-client'))
        .then(() => setTimeout(() => { history.push(`/BandmateFinder-client/users/${user.username}`) }, 10) )
    }

    useEffect(() => {
        const unparsedsedLoggedInUser = sessionStorage.getItem('user');
        const loggedInUser = JSON.parse(unparsedsedLoggedInUser);
        api.fetchUser(loggedInUser)
            .then(response => setLoggedInUser(response.data));
    }, [])

    return (
        <div className={styles.CreateComment}>
            <h2>Comments</h2>
            <form onSubmit={submitHandler}>
                {/* <input onChange={onChangeHandler} type="text" /> */}
                {/* <button type="submit">Send</button> */}
                <ThemeProvider theme={theme}>
                <TextField variant=''
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    placeholder='Write a comment'
                    multiline
                    rows={5}
                    rowsMax={10}
                    onChange={onChangeHandler}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >Send <i class="fas fa-paper-plane"></i></Button>
                </ThemeProvider>
            </form>
        </div>
    )
}
