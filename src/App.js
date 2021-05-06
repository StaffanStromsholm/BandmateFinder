import { Switch, Route, Redirect } from "react-router-dom";
import Header from "./components/Header/Header.js";
import EditProfile from "./components/EditProfile/EditProfile.js";
import SearchUsers from "./components/SearchUsers/SearchUsers.js";
import Login from "./components/Authentication/Login.js";
import SignUp from "./components/Authentication/SignUp.js";
import ViewUser from "./components/ViewUser/ViewUser.js";
import LandingPage from "./components/LandingPage/LandingPage";
import useToken from "./Hooks/useToken";

function App() {
    const { token, setToken, user, setUser } = useToken();

    if (!token)
        return (
            <>
                <Switch>
                    <Route path="/BandmateFinder-client" exact>
                        <LandingPage />
                    </Route>

                    <Route path="/BandmateFinder-client/login" exact>
                        <Login setUser={setUser} setToken={setToken} />
                    </Route>

                    <Route path="/BandmateFinder-client/signup" exact>
                        <SignUp setToken={setToken} />
                    </Route>

                    <Redirect to="/BandmateFinder-client/login" />
                </Switch>
            </>
        );

    return (
        <>
            <Header user={user} setToken={setToken} />

            <Switch>
                <Route exact path="/BandmateFinder-client/edit-profile">
                    <EditProfile />
                </Route>

                <Route path="/BandmateFinder-client/search">
                    <SearchUsers />
                </Route>

                <Route path="/BandmateFinder-client/users/:username">
                    <ViewUser />
                </Route>

                <Route path="/BandmateFinder-client">
                    <SearchUsers />
                </Route>
            </Switch>
        </>
    );
}

export default App;
