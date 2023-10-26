import React, { useEffect, useState } from "react";
import axios from "axios";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const TodoForm = ({ setTodos, fetchData }) => {

    const [newTodo, setNewTodo] = useState({
        'body': '',
        'goals': ''
    })

    const handleChange = (e) => {
        setNewTodo(prev => ({
            ...prev,
            'body': e.target.value

        }))
    }

    const handleChangeGoal = (e) => {
        setNewTodo(prev => ({
            ...prev,
            'goals': e.target.value
        }))
    }


    const postTodo = async () => {
        try {
            await axios.post(`http://127.0.0.1:8000/api/view/`, newTodo)
            setNewTodo({ 'body': '', 'goals': '' })
            setTodos(prevTodos => [...prevTodos, newTodo])
            fetchData()
        } catch (error) {
            console.log(error);
        }
    }

    // const handleKeyDown = (e) => {
    //     if (e.key === 'Enter') {
    //         postTodo();
    //     }
    // }



    return (
        <>
            <input type="text" placeholder="Добавить задачу" value={newTodo.body}
                className="input input-bordered input-info w-full max-w-xs"
                onChange={handleChange}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        postTodo();
                    }
                }} />
            

            <input type="text" placeholder="Описание" value={newTodo.goals}
                className="input input-bordered input-info w-full max-w-xs"
                onChange={handleChangeGoal}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        postTodo();
                    }
                }} />
            <button onClick={postTodo} className="btn btn-primary ml-2">Добавить</button>
        </>
    )
}

export default TodoForm;
