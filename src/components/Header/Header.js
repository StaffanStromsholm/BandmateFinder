//React
import React, { useEffect, useState } from "react";
import { withRouter, useHistory } from "react-router-dom";
import PropTypes from "prop-types";

//Material UI
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import FormGroup from "@material-ui/core/FormGroup";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

//Random
import useToken from "../../Hooks/useToken";
import plectrum from "../../images/plectrumLogo.png";
import * as api from "../../api/index.js";
import styles from "./Header.module.scss";

//Material UI styling
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const Header = ({ setToken, loggedInUser }) => {
    const history = useHistory();
    const classes = useStyles();
    const { token } = useToken();
    const [user, setUser] = useState();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClick = (pageUrl) => {
      history.push('/BandmateFinder-client')
      //redirect hack
      setTimeout(() => {
        history.push(pageUrl);
      }, 10)
      setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setToken("");
        history.push("/BandmateFinder-client/login");
    };

    useEffect(() => {
        //get user info when Header component mounts if there is no user defined
        if(!user) {
          const unparsedUserName = localStorage.getItem("user");
          const username = JSON.parse(unparsedUserName);

          api.fetchUser(username).then((response) => setUser(response.data));
        }
    }, []);

    //make sure user is fetched before rendering
    if(!user) {
      return null;
    }

    return (
        <div className={classes.root}>
            <FormGroup></FormGroup>

            <AppBar position="static" style={{ backgroundColor: "#cc0066" }}>

                <Toolbar>

                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu">
                        <img onClick={() => handleMenuClick("/BandmateFinder-client")} width="70px" src={plectrum}></img>
                    </IconButton>

                      {/* hack to get items spaced apart. FIX */}
                    <Typography variant="h6" className={classes.title}></Typography>

                    <div>
                        <IconButton
                            onClick={handleMenu}
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="menu">

                            <Typography
                                variant="h6"
                                className={classes.title}
                                style={{ marginRight: "1rem" }}>
                                  {user.username}
                            </Typography>

                            <MenuIcon />

                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{ vertical: "top", horizontal: "right" }}
                            keepMounted
                            transformOrigin={{ vertical: "top", horizontal: "right" }}
                            open={open}
                            onClose={() => setAnchorEl(null)}>

                            <MenuItem onClick={() => handleMenuClick(`/BandmateFinder-client/users/${user.username}`)}>
                                <div className={styles.menuItems}>
                                    <p>Profile</p>
                                    <i className="fas fa-user"></i>{" "}
                                </div>
                            </MenuItem>

                            <MenuItem onClick={() => handleMenuClick("/BandmateFinder-client/edit-profile")}>
                                <div className={styles.menuItems}>
                                    <p>Edit</p>
                                    <i class="fas fa-user-edit"></i>
                                </div>
                            </MenuItem>

                            <MenuItem
                                onClick={() =>
                                    handleMenuClick(
                                        "/BandmateFinder-client/search")}>
                                <div className={styles.menuItems}>
                                    <p>Search</p>
                                    <i className="fas fa-search"></i>
                                </div>
                            </MenuItem>
                            <MenuItem onClick={() => handleLogout()}>
                                <div className={styles.menuItems}>
                                    <p>Sign out</p>{" "}
                                    <i className="fas fa-sign-out-alt"></i>{" "}
                                </div>
                            </MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default withRouter(Header);

Header.propTypes = {
    setToken: PropTypes.func.isRequired,
    setUser: PropTypes.func.isRequired,
};
