import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import React, { useContext } from "react";
import Table from "./Table";
import TodoForm from "./TodoForm";

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
      <div class="site-header__top">
        <div class="wrapper site-header__wrapper">
          <div class="site-header__middle">
            <a href="#" class="brand">
              Todo App
            </a>
          </div>
          <div class="site-header__end top">
            <a href="#">Войти</a>
            <a href="#" class="button">
              Зарегистрироваться
            </a>
          </div>
        </div>
      </div>
      <div class="site-header__bottom">
        <div class="wrapper site-header__wrapper">
          <div class="site-header__start">
            <nav class="nav">
              <ul class="nav__wrapper">
                <li class="nav__item">
                  <a href="#">Список</a>
                </li>
                <li class="nav__item">
                  <a href="#">Обзор</a>
                </li>
                <li class="nav__item">
                  <a href="#">Киты</a>
                </li>
                <li class="nav__item">
                  <a href="#">Добавить</a>
                </li>
                <li class="nav__item">
                  <a href="#">Контакты</a>
                </li>
              </ul>
            </nav>
          </div>

          <div class="site-header__end bottom">
            <a href="#">
              <svg
                version="1.1"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Profile</title>
                <path d="m65.57 52.5c6.9336-4.5078 11.574-11.797 12.723-19.988 1.1484-8.1875-1.3047-16.473-6.7344-22.715-5.4258-6.2422-13.289-9.8242-21.559-9.8242s-16.133 3.582-21.559 9.8242c-5.4297 6.2422-7.8828 14.527-6.7344 22.715 1.1484 8.1914 5.7891 15.48 12.723 19.988-10.012 3.2812-18.73 9.6406-24.914 18.172-6.1836 8.5273-9.5117 18.793-9.5156 29.328h7.1445c0-15.312 8.168-29.461 21.426-37.117 13.262-7.6523 29.598-7.6523 42.859 0 13.258 7.6562 21.426 21.805 21.426 37.117h7.1445c-0.003906-10.535-3.332-20.801-9.5156-29.328-6.1836-8.5312-14.902-14.891-24.914-18.172zm-37-23.93c0-5.6836 2.2578-11.133 6.2773-15.152 4.0195-4.0156 9.4688-6.2734 15.152-6.2734s11.133 2.2578 15.152 6.2734c4.0195 4.0195 6.2773 9.4688 6.2773 15.152 0 5.6836-2.2578 11.137-6.2773 15.152-4.0195 4.0195-9.4688 6.2773-15.152 6.2773s-11.133-2.2578-15.152-6.2773c-4.0195-4.0156-6.2773-9.4688-6.2773-15.152z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="content">
          <h1>todo list</h1>
          <form id="form">
            <input type="text" id="item" placeholder="Enter todo" />
            <input type="submit" value="Add" class="btn" />
          </form>

          <ul class="todos"></ul>
        </div>
      </div>

      <div class="main_list ">
        <div class="navbar">
          <a href="#h" class="bord">
            <image src="img/Ellipse 1.png" alt="" />
          </a>

          <div class="dropdown">
            <button class="dropbtn bord">
              <image src="img/Group 1 (1).png" alt="" />
              <i class="fa fa-caret-down"></i>
            </button>
            <div class="dropdown-content bord">
              <a href="#">Сервер 1</a>
              <a href="#">Сврвер 2</a>
              <a href="#">Сервер 3</a>
            </div>
          </div>

          <a href="#" class="nav-right_s bord">
            Сервер
          </a>

          <a href="#" class="nav-right bord">
            <image src="img/birka.png" alt="" />
          </a>
          <a href="#" class="nav-right bord">
            <img src="img/calendar (2).png" alt="" />
          </a>
          <a href="#" class="nav-right bord">
            <img src="img/user.png" alt="" />
          </a>
        </div>
      </div>

      <TodoForm setTodos={setTodos} fetchData={fetchData} />
      <Table todos={todos} isLoading={isLoading} setTodos={setTodos} />
    </div>
  );
}

export default App;
