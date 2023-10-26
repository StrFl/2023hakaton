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
      document.getElementById("form_btn_reg").innerHTML = "РЕГИСТРАЦИЯ";
      setRegistrationToggle(false);
    } else {
      document.getElementById("form_btn_sign").innerHTML = "ВОЙТИ";
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
      <div className="square">
      
          <button id="form_btn_reg" onClick={update_form_btn} variant="light">
          <p className="reg-text">РЕГИСТРАЦИЯ</p> 
          </button>
          <button id="form_btn_sign" onClick={update_form_btn} variant="light">
          <p className="reg-text">ВОЙТИ</p> 
          </button>
    
          {registrationToggle ? (
        <div className="col">
          <form onSubmit={(e) => submitRegistration(e)}>
              <input
                className="col input-pole"
              type="email"
              placeholder="ЭЛ. ПОЧТА"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

              <input
                id="d"
                className="col input-pole"
              type="text"
              placeholder="ИМЯ"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

              <input
                className="col input-pole"
              type="password"
              placeholder="ПАРОЛЬ"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button variant="primary" type="submit" className="col button-reg">
             <p className="text-regis">ЗАРЕГИСТРИРОВАТЬСЯ</p> 
            </button>

          </form>
        </div>
      ) : (
        <div className="col">
          <form onSubmit={(e) => submitLogin(e)}>
                <input
                  className="col input-pole"
              type="email"
              placeholder="ЭЛ. ПОЧТА"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

                <input
                  className="col input-pole"
              type="password"
              placeholder="ПАРОЛЬ"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button variant="primary" type="submit" className="col button-sign">
             <p className="text-sign">ВОЙТИ</p> 
            </button>
          </form>
        </div>
      )}
        
      </div>
      
    </div>
  );
}


