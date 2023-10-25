import { Component } from "react";
import "./App.css";

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
