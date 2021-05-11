import { Switch, Route, Redirect } from "react-router-dom";
import Header from "./components/Header/Header.js";
import SearchUsers from "./components/SearchUsers/SearchUsers.js";
import Login from "./components/Authentication/Login.js";
import SignUp from "./components/Authentication/SignUp.js";
import ViewUser from "./components/ViewUser/ViewUser.js";
import LandingPage from "./components/LandingPage/LandingPage";
import useToken from "./Hooks/useToken";
import EditProfile from "./components/EditProfile/EditProfile.js";

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
            <Header token={token} loggedInUser={user} setToken={setToken} />

            <Switch>

                <Route path="/BandmateFinder-client/search" exact>
                    <SearchUsers />
                </Route>

                <Route path="/BandmateFinder-client/users/:username" exact>
                    <ViewUser />
                </Route>
{/* 
                <Route path="/BandmateFinder-client/editprofile" exact>
                    <EditProfile setToken={setToken} setUserHook={setUser} loggedInUser={user} />
                </Route> */}

                <Route path="/BandmateFinder-client" exact>
                    <SearchUsers />
                </Route>
                
            </Switch>
        </>
    );
}

export default App;
