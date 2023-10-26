import React, { useEffect, useState } from "react";
import axios from "axios";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const TodoForm = ({ setTodos, fetchData }) => {
    const [isMsbVisible, setMsbVisible] = useState(false);

    const handleMsbClick = () => { setMsbVisible(!isMsbVisible); };

    const [newTodo, setNewTodo] = useState({
        'body': '',
        'goals': '',
        'prioritet': ''
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
    const handleChangePrior = (e) => {
        setNewTodo(prev => ({
            ...prev,
            'prioritet': e.target.value
        }))
    }


    const postTodo = async () => {
        try {
            await axios.post(`http://127.0.0.1:8000/api/view/`, newTodo)
            setNewTodo({ 'body': '', 'goals': '' , 'prioritet': ''})
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
        <div className="col">
            <input type="text" placeholder="Добавить задачу" value={newTodo.body}
                className="inp"
                onChange={handleChange}
                id="msbo" onClick={() => {
                    document.body.classList.toggle('msb-x');
                  }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        postTodo();
                    }
                }} />


            <div class="msb" id="msb">
                <div className="col">
                    <input type="text" placeholder="Описание" value={newTodo.goals}
                    className="desc"
                    onChange={handleChangeGoal}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            postTodo();
                        }
                        }} />
                  
                    <input type="text" placeholder="Приоритет" value={newTodo.prioritet}
                    className="desc"
                    onChange={handleChangePrior}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            postTodo();
                        }
                    }} />



                    <button onClick={postTodo} className="btn">Добавить</button>
                </div>
                    
                </div>


            
        </div>
    )
}

export default TodoForm;
