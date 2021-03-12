import { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header.js';
import EditProfile from './components/EditProfile/EditProfile.js';
import SearchUsers from './components/SearchUsers/SearchUsers.js';
import Login from './components/Authentication/Login.js';
import SignUp from './components/Authentication/SignUp.js';
import ViewUser from './components/ViewUser/ViewUser.js';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/signup" exact>
          <SignUp />
        </Route>
        <Route exact path="/">
        </Route>
        <Route exact path="/edit-profile">
          <EditProfile />
        </Route>
        <Route path="/search" exact>
          <SearchUsers />
        </Route>
        <Route path="/users/:username">
          <ViewUser />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
