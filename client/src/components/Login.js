import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const Login = props => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });

  const handleChange = e => {
    let name = e.target.name;
    setCredentials({ ...credentials, [name]: e.target.value });
  };

  const login = e => {
    e.preventDefault();
    console.log(credentials.username);
    console.log(credentials.password);
    console.log(credentials);
    axiosWithAuth()
      .post("/login", credentials)
      .then(res => {
        localStorage.setItem("token", res.data.payload);
        props.history.push("/bubble");
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="outter-login">
      <div className="login-page">
        <h1>LOGIN</h1>

        <form onSubmit={login}>
          <input
            type="text"
            name="username"
            placeholder="Lambda School"
            value={credentials.username}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="i<3Lambd4"
            value={credentials.password}
            onChange={handleChange}
          />
          <div>
            <button>Log in</button>
          </div>
          <div className="color-link">
            <Link
              style={{
                textDecoration: "none",
                color: "red",
                fontSize: "14px"
              }}
              to="/bubble"
            >
              Already Signed In?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
//username: 'Lambda School', password: 'i<3Lambd4'
