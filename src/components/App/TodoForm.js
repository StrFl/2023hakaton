import React, { useEffect, useState } from "react";
import axios from "axios";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const TodoForm = ({ setTodos, fetchData }) => {
  const [newTodo, setNewTodo] = useState({
    projName: "фывфывфыwg",
    taskPackage: "фывwg",
    taskName: "",
    goals: "фывфыв",
    srok_end: "28.10.2023",
    prioritet: "вввwgwg",
    worker: "Пользователь 1",
    status: "Выв",
    fileStrId: "",
    file: null,
    user: 1,
  });

  const handleChange = (e) => {
    setNewTodo((prev) => ({
      ...prev,
      taskName: e.target.value,
    }));
  };

  const postTodo = async () => {
    try {
      await axios.post(`http://127.0.0.1:8000/api/create/`, newTodo);
      setNewTodo({ taskName: "" });
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  // const handleKeyDown = (e) => {
  //     if (e.key === 'Enter') {
  //         postTodo();
  //     }
  // }

  return (
    <>
      <input
        type="text"
        placeholder="Add Todo"
        value={newTodo.taskName}
        className="input input-bordered input-info w-full max-w-xs"
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            postTodo();
          }
        }}
      />
      <button onClick={postTodo} className="btn btn-primary ml-2">
        Add todo
      </button>
    </>
  );
};

export default TodoForm;
