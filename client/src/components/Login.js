import React, { useState } from "react";

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
    <div>
      <form onSubmit={login}>
        <input
          type="text"
          name="username"
          value={credentials.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
        />
        <button>Log in</button>
      </form>
    </div>
  );
};

export default Login;
//username: 'Lambda School', password: 'i<3Lambd4'
