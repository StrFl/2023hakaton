import React, { Component } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Table from "./Table";
import TodoForm from "./TodoForm";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

function App({ email, password }) {
  const [todos, setTodos] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await client.get("/api/create/", {
        email: email,
        password: password,
      });
      setTodos(response.data);
      setisLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="head">
        <p className="h-title">Проект пользователя Test</p>
      </div>

      {/* Body */}
      <TodoForm setTodos={setTodos} fetchData={fetchData} />
      <Table todos={todos} isLoading={isLoading} setTodos={setTodos} />
    </div>
  );
}

export default App;
