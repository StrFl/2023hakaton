import React, { Component } from "react";
import "./App.css";
import axios from "axios";

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: 'Test'
    };
  }
  
  render() {


    return (
    <div className="head">
      <p className="h-title">Проект пользователя { this.state.user }</p>
    </div>
      


  );}

  
}

export default App;
