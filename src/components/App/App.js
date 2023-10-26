import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import React, { useContext } from "react";
import Table from "./Table";
import TodoForm from "./TodoForm";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

function App() {
  const [todos, setTodos] = useState("");
  const [isLoading, setisLoading] = useState(true);


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await client.get("/api/view/");
      setTodos(response.data);
      setisLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="text-logo">
        <p id="text-l">Todo App</p>
        <p id="sec-line">Новая группа</p> 
      </div>
  

      <TodoForm setTodos={setTodos} fetchData={fetchData} />
      <Table todos={todos} isLoading={isLoading} setTodos={setTodos} />
    </div>
  );
}

export default App;
