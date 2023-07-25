import React from "react";

const Register = ({
  setLoginCredentials,
  loginCredentials,
  registerHandler,
  setForm,
}) => {
  return (
    <div className="container">
      <form onSubmit={registerHandler}>
        <div className="form-card">
          <h2 className="header">Register</h2>
          <label htmlFor="username">Username</label>
          <input
            value={loginCredentials?.username}
            onChange={(e) =>
              setLoginCredentials({
                ...loginCredentials,
                username: e.target.value,
              })
            }
            type="text"
            id="username"
            placeholder="Username"
          />
          <label htmlFor="password">Password</label>
          <input
            value={loginCredentials?.password}
            onChange={(e) =>
              setLoginCredentials({
                ...loginCredentials,
                password: e.target.value,
              })
            }
            type="password"
            id="password"
            placeholder="Password"
          />
          <p className="link" onClick={() => setForm("login")}>
            Already have an account? 
          </p>
          <button className="success-btn">Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
