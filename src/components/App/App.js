import React, { Component } from "react";
import "./App.css";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      user: 'Test',

    };
  }

  componentDidMount() {
    fetch("http://localhost:8000/api/create/")
      .then((response) => response.json())
      .then((data) => this.setState({ data }));
  }




  
  render() {


    return (
    <div className="head">
      <p className="h-title">Проект пользователя { this.state.user }</p>
    </div>
      


  );}

  
}

export default App;
