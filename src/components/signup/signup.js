import React, { useState, useEffect } from "react";
import styled from "styled-components";
// import signupBackground from "../../../assets/backgrounds/signupBackground.svg";
import SignupForm from "./signupForm";
// import { signupRequest } from "../../../services/open/auth";
import { Redirect, Link } from "react-router-dom";
const Signup = (props) => {
  let [registerUser, userUpdater] = useState({
    username: "",
    password: "",
    rePassword: "",
    email: "",
  });
  let [registerFlag, flagChanger] = useState(false);
  let [error, changeError] = useState(null);
  useEffect(() => {
    if (registerUser.username.length > 0) {
      console.log(registerUser);
      let body = registerUser;
      delete body.rePassword;
      fetch("http://localhost:5000/signup", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        method: "POST",
        body: JSON.stringify(body),
      })
        .then((res) => {
          res.json().then((res) => {
            console.log(res);
            if (res.status == 400) {
              changeError("Username not available");
            } else {
              console.log("Registered Successfully");
              flagChanger(true);
            }
          });
        })
        .catch((err) => {
          changeError("Some Internal Error");
        });
    }
  }, [registerUser]);
  return (
    <SignupContainer className="container-fluid">
      <div className="row align-items-stretch">
        <div className="col-lg-6 col-md-8 col-12 bg-white border-right d-flex align-items-center justify-content-center">
          <div className="content">
            <h2 className="text-success text-center">Signup</h2>
            <SignupForm registerHandler={userUpdater} />
            {error && <div className="alert alert-danger">{error}</div>}
            {registerFlag && <Redirect to="/login" />}
          </div>
        </div>
      </div>
    </SignupContainer>
  );
};

export default Signup;

export const SignupContainer = styled.div`
  min-height: 100vh;
  background-repeat: no-repeat;
  background-position: right center;
  background-size: auto 100%;
  .row {
    min-height: 100vh;
  }
  @media (max-width: 768px) {
    padding-top: 60px;
  }
`;
