import React, { Component } from "react";
import "./App.css";
import MainTemplate from "./components/mainTemplate";
import Files from "./components/userFiles";
import Signup from "./components/signup/signup.js";
import Login from "./components/login/login.js";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { UserRoute, GuestRoute } from "./components/authentication";
class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <UserRoute exact path="/">
              <MainTemplate />
            </UserRoute>
            <UserRoute path="/showfiles">
              <Files></Files>
            </UserRoute>
            <GuestRoute path="/signup">
              <Signup></Signup>
            </GuestRoute>
            <GuestRoute path="/login">
              <Login></Login>
            </GuestRoute>
            <Redirect to="/login" />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
