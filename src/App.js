import { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header.js';
import EditProfile from './components/EditProfile/EditProfile.js';
import SearchUsers from './components/SearchUsers/SearchUsers.js';
import Login from './components/Authentication/Login.js';
import SignUp from './components/Authentication/SignUp.js';
import ViewUser from './components/ViewUser/ViewUser.js';
import Footer from './components/Footer/Footer.js';
import LandingPage from './components/LandingPage/LandingPage';
import useToken from './Hooks/useToken';

function App() {
  const { token, setToken } = useToken();
  const [loggedInUser, setLoggedInUser] = useState();
  
  const setLoggedInUserHandler = (user) => {
    console.log(user)
    setLoggedInUser(user);
  }

  if (!token) return (
    <Switch>
      <Route path="/login" exact>
        <Header setToken={setToken}/>
        <Login setUser={setLoggedInUserHandler} setToken={setToken} />
      </Route>
      <Route path="/signup" exact>
        <Header setToken={setToken} />
        <SignUp setToken={setToken} />
      </Route>
      <Redirect to='/login' />
    </Switch>
  )

  return (
    <div className="App">

      <Switch>

        <Route path="/login" exact>
          <Header setToken={setToken} />
          <Login setUser={setLoggedInUserHandler} setToken={setToken} />
        </Route>

        <Route path="/signup" exact>
          <Header setToken={setToken} />
          <SignUp setToken={setToken} />
        </Route>

        <Route exact path="/">
          <Header setToken={setToken} />
          <LandingPage />
        </Route>

        <Route exact path="/edit-profile">
          <Header setToken={setToken} />
          <EditProfile user={loggedInUser} />
        </Route>

        <Route path="/search" exact>
          <Header setToken={setToken} />
          <SearchUsers />
        </Route>

        <Route path="/users/:username">
          <Header setToken={setToken} />
          <ViewUser />
        </Route>
      </Switch>

    </div>
  );
}

export default App;