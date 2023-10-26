import axios from "axios";
import React, { useState } from "react";
import {
  MdOutlineDeleteOutline,
  MdEditNote,
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
} from "react-icons/md";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const Table = ({ todos, isLoading, setTodos }) => {
  const [editText, setEditText] = useState({
    body: "",
  });

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/detail/${id}/`);
      const newList = todos.filter((todo) => todo.id !== id);
      setTodos(newList);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (id, value) => {
    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/api/detail/${id}/`,
        value
      );
      console.log(response.data);
      const newTodos = todos.map((todo) =>
        todo.id === id ? response.data : todo
      );
      setTodos(newTodos);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    setEditText((prev) => ({
      ...prev,
      body: e.target.value,
    }));
    console.log(editText);
  };

  const handleClick = () => {
    handleEdit(editText.id, editText);
    setEditText({
      body: "",
    });
  };

  const handleCheckbox = (id, value) => {
    console.log(value.completed);
    handleEdit(id, {
      completed: !value,
    });
  };

  return (
    <div>
      
    
          {isLoading ? (
            <div>Загрузка </div>
          ) : (
            <>
              {" "}
              {todos.map((todoItem, index) => (
                <tr key={todoItem.id} className="line">
                
                    <p
                      onClick={() =>
                        handleCheckbox(todoItem.id, todoItem.completed)
                      }
                      className="line"
                    >
                      {todoItem.completed === true ? (
                        <MdOutlineCheckBox />
                      ) : (
                        <MdOutlineCheckBoxOutlineBlank />
                      )}
                    </p>
               
                  <p className="p-3 text-sm " title={todoItem.id}>
                    {todoItem.prioritet}
                  </p>
                  <p className="p-3 text-sm " title={todoItem.id}>
                    {todoItem.body}
                  </p>
                  <p className="p-3 text-sm " title={todoItem.id}>
                    {todoItem.goals}
                  </p>
                  <td className="p-3 text-sm text-center">
                    <span
                      className={`p-1.5 text-xs font-medium tracking-wider rounded-md ${
                        todoItem.completed ? "bg-green-300" : "bg-red-300"
                      }`}
                    >
                      {todoItem.completed ? "Выполнено" : "В процессе"}
                    </span>
                  </td>
                  <td className="p-3 text-sm font-medium">
                    {new Date(todoItem.created).toLocaleString()}
                  </td>
                  <td className="p-3 text-sm font-medium grid grid-flow-col items-center mt-5 ">
                    <span>
                      <label htmlFor="my-modal">
                        <MdEditNote
                          onClick={() => setEditText(todoItem)}
                          className=" text-xl cursor-pointer"
                        />
                      </label>
                    </span>
                    <span className=" text-xl cursor-pointer">
                      <MdOutlineDeleteOutline
                        onClick={() => handleDelete(todoItem.id)}
                      />
                    </span>
                  </td>
                </tr>
              ))}
            </>
          )}
    

    
      
  
   
    </div>
  );
};

export default Table;
