import { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header.js';
import EditProfile from './components/EditProfile/EditProfile.js';
import SearchUsers from './components/SearchUsers/SearchUsers.js';
import Login from './components/Authentication/Login.js';
import SignUp from './components/Authentication/SignUp.js';
import ViewUser from './components/ViewUser/ViewUser.js';
import Footer from './components/Footer/Footer.js';
import LandingPage from './components/LandingPage/LandingPage';

function App() {
  return (
    <div className="App">
      
      <Switch>

        <Route path="/login" exact>
        <Header />
          <Login />
        </Route>

        <Route path="/signup" exact>
        <Header />
          <SignUp />
        </Route>

        <Route exact path="/">
          <LandingPage />
        </Route>

        <Route exact path="/edit-profile">
        <Header />
          <EditProfile />
        </Route>

        <Route path="/search" exact>
        <Header />
          <SearchUsers />
        </Route>

        <Route path="/users/:username">
        <Header />
          <ViewUser />
        </Route>

      </Switch>
      
    </div>
  );
}

export default App;