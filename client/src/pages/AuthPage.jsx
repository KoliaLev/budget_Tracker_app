// import "materialize-css";

import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useApiRequest } from "../hooks/apiRequest";
import { useMessage } from "../hooks/messageHook";

export const AuthPage = () => {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const { request, loading, error, clearError } = useApiRequest();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request("/api/auth/register", "POST", { ...form });
      message(data.message);
    } catch (e) {}
  };

  const loginHandler = async () => {
    try {
      const data = await request("/api/auth/login", "POST", { ...form });
      message(data.message);
      auth.login(data.token, data.userId, data.email);
    } catch (e) {}
  };

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  return (
    <div>
      <div className="container">
        <h2> Budget Tracker</h2>
        <div className="card grey lighten-2">
          <div className="card-content white-text">
            <span className="card-title grey-text text-darken-3">Authorization </span>

            <div>
              <div className="input-field">
                <input
                  id="email"
                  type="email"
                  className="validate"
                  // placeholder="Введите email"
                  name="email"
                  onChange={changeHandler}
                  value={form.email}
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field ">
                <input
                  id="password"
                  type="password"
                  className="validate"
                  // placeholder="Введите пароль"
                  name="password"
                  onChange={changeHandler}
                  value={form.password}
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>
          </div>
          <div className="card-action ">
            <div className="row">
              <button
                className="waves-effect waves-light btn col s4 "
                disabled={loading}
                onClick={loginHandler}>
                Login
              </button>
              {/* <div className="col s1"></div> */}
              <button
                className="waves-effect waves-light btn col s4 offset-s1"
                onClick={registerHandler}
                disabled={loading}>
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
