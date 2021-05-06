import { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header.js";
import EditProfile from "./components/EditProfile/EditProfile.js";
import SearchUsers from "./components/SearchUsers/SearchUsers.js";
import Login from "./components/Authentication/Login.js";
import SignUp from "./components/Authentication/SignUp.js";
import ViewUser from "./components/ViewUser/ViewUser.js";
import Footer from "./components/Footer/Footer.js";
import LandingPage from "./components/LandingPage/LandingPage";
import useToken from "./Hooks/useToken";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  const { token, setToken, user, setUser } = useToken();
  const [loggedInUser, setLoggedInUser] = useState();

  const setLoggedInUserHandler = (user) => {
    console.log(user);
    setLoggedInUser(user);
  };

  if (!token)
    return (
      <Router>
        <Switch>
          <Header setUser={setUser} setToken={setToken} />
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
      </Router>
    );

  return (
    <div className="App">
      <Router>
        <Header user={user} setToken={setToken} />
        <Switch>
          <Route path="/BandmateFinder-client/login" exact>
            {/* <Header user={user} setToken={setToken} /> */}
            <Login setUser={setUser} setToken={setToken} />
          </Route>

          <Route path="/BandmateFinder-client/signup" exact>
            {/* <Header user={user} setToken={setToken} /> */}
            <SignUp setToken={setToken} />
          </Route>

          <Route exact path="/BandmateFinder-client/edit-profile">
            {/* <Header user={user} setToken={setToken} /> */}
            <EditProfile />
          </Route>

          <Route path="/BandmateFinder-client/search">
            {/* <Header user={user} setToken={setToken} /> */}
            <SearchUsers />
          </Route>

          <Route path="/BandmateFinder-client/users/:username">
            {/* <Header user={user} setToken={setToken} /> */}
            <ViewUser loggedInUser={user} />
          </Route>

          <Route path="/BandmateFinder-client">
            <LandingPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
