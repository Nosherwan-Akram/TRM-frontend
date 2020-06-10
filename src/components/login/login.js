import React, { useEffect, useState } from "react";
import styled from "styled-components";
import LoginBackground from "../../assets/backgrounds/loginBackground.svg";
import { LoginForm } from "./loginform";
// import { loginRequest } from "../../../services/open/auth";
// import store from "../../../redux/store";
// import { login } from "../../../redux/slices/user-slice";
import { Redirect, useLocation, Link } from "react-router-dom";
const Login = (props) => {
  let [loginForm, formUpdater] = useState({ username: "", password: "" });
  let [loggedIn, logChanger] = useState(false);
  let [error, errorUpdater] = useState(null);
  useEffect(() => {
    if (loginForm.username.length > 0) {
      console.log(loginForm);
      fetch("http://localhost:5000/login", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(loginForm),
        method: "POST",
      })
        .then((res) => {
          res.json().then((res) => {
            if (res.status == 400) {
              errorUpdater("Wrong Password");
            } else {
              console.log("token setting in local store");
              localStorage.setItem("token", res.access_token);
              localStorage.setItem("username", res.username);
              console.log(localStorage);
              logChanger(true);
            }
          });
        })
        .catch((err) => {
          errorUpdater("Some internal error");
        });
    }
  }, [loginForm]);
  return (
    <LoginContainer className="container-fluid">
      <div className="row align-items-stretch">
        <div className="col-lg-6 col-md-8 col-12 border-right bg-white d-flex justify-content-center align-items-center">
          <div className="content">
            <h2 className="text-success text-center">Login</h2>
            <LoginForm formSubmission={formUpdater} />
            {error && <div className="alert alert-danger">{error}</div>}
            <hr className="w-100" />
            <Link className="btn btn-success w-100" to="signup">
              Signup
            </Link>
          </div>
        </div>
      </div>
      {loggedIn && <Redirect to="/" />}
    </LoginContainer>
  );
};

export const LoginContainer = styled.div`
  min-height: 100vh;
  // background: url(${LoginBackground});
  background-repeat: no-repeat;
  background-position: top right;
  background-size: 100% auto;
  .row {
    min-height: 100vh;
  }
  @media (max-width: 768px) {
    padding-top: 60px;
  }
`;

export default Login;
