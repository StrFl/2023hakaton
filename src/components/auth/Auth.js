import "./Auth.css";
import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000",
});


export const Auth = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [registrationToggle, setRegistrationToggle] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    client
      .get("/api/user/")
      .then(function (res) {
        setCurrentUser(true);
      })
      .catch(function (error) {
        setCurrentUser(false);
      });
  }, []);

  function update_form_btn() {
    if (registrationToggle) {
      document.getElementById("form_btn").innerHTML = "Зарегаться";
      setRegistrationToggle(false);
    } else {
      document.getElementById("form_btn").innerHTML = "Войти";
      setRegistrationToggle(true);
    }
  }

  function submitRegistration(e) {
    e.preventDefault();
    client
      .post("/api/register/", {
        email: email,
        username: username,
        password: password,
      })
      .then(function (res) {
        client
          .post("/api/login/", {
            email: email,
            password: password,
          })
          .then(function (res) {
            setCurrentUser(true);
            navigate("/app");
       
          })
          .catch(function (error) {
            setCurrentUser(false);
          });
      })
      .catch(function (error) {
        setCurrentUser(false);
      });
  }

  function submitLogin(e) {
    e.preventDefault();
    client
      .post("/api/login/", {
        email: email,
        password: password,
      })
      .then(function (res) {
        setCurrentUser(true);

        navigate("/app");

      })
      .catch(function (error) {
        setCurrentUser(false);
      });
  }

  function submitLogout(e) {
    e.preventDefault();
    client.post("/api/logout/", { withCredentials: true }).then(function (res) {
      setCurrentUser(false);
    });
  }



  return (
    <div>
      <button id="form_btn" onClick={update_form_btn} variant="light">
        Register
      </button>

      {registrationToggle ? (
        <div className="center">
          <form onSubmit={(e) => submitRegistration(e)}>
            <input
              type="email"
              placeholder="ПОЧТА"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="text"
              placeholder="НИК"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              type="password"
              placeholder="ПАРОЛЬ"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button variant="primary" type="submit">
              Submit
            </button>

          </form>
        </div>
      ) : (
        <div className="center">
          <form onSubmit={(e) => submitLogin(e)}>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button variant="primary" type="submit">
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
}


