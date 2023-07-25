import React from "react";

const Login = ({
  setLoginCredentials,
  loginCredentials,
  loginHandler,
  setForm,
}) => {
  return (
    <div className="container">
      <form onSubmit={loginHandler}>
        <div className="form-card">
          <h2 className="header">Login</h2>
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
          <p className="link" onClick={() => setForm("register")}>
            Don't have an account? Click to register
          </p>
          <button className="success-btn">Sign In</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
