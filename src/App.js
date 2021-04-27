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
  const { token, setToken, user, setUser } = useToken();
  const [loggedInUser, setLoggedInUser] = useState();
  
  const setLoggedInUserHandler = (user) => {
    console.log(user)
    setLoggedInUser(user);
  }

  if (!token) return (
    <Switch>
      <Route path="/" exact>
        <Header setUser={setUser} setToken={setToken}/>
        <LandingPage />
      </Route>
      <Route path="/login" exact>
        <Header setUser={setUser} setToken={setToken}/>
        <Login setUser={setUser} setToken={setToken} />
      </Route>
      <Route path="/signup" exact>
        <Header setUser={setUser} setToken={setToken} />
        <SignUp setToken={setToken} />
      </Route>
      <Redirect to='/login' />
    </Switch>
  )

  return (
    <div className="App">

      <Switch>

        <Route path="/login" exact>
          <Header user={user} setToken={setToken} />
          <Login setUser={setUser} setToken={setToken} />
        </Route>

        <Route path="/signup" exact>
          <Header user={user} setToken={setToken} />
          <SignUp setToken={setToken} />
        </Route>

        <Route exact path="/">
          <Header user={user} setToken={setToken} />
          <LandingPage />
        </Route>

        <Route exact path="/edit-profile">
          <Header user={user} setToken={setToken} />
          <EditProfile />
        </Route>

        <Route path="/search" exact>
          <Header user={user} setToken={setToken} />
          <SearchUsers />
        </Route>

        <Route path="/users/:username">
          <Header user={user} setToken={setToken} />
          <ViewUser />
        </Route>
      </Switch>

    </div>
  );
}

export default App;