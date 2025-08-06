import React, { useEffect, useState } from 'react';
import axios from "axios";
import todoContext from './createContext';

export const StateContext = ({ children }) => {
  const [Todos, setTodos] = useState([]);
  const [newtodo, setnewtodo] = useState("")
  const [Loading, setLoading] = useState(false);
  const [Error, setError] = useState(null);

  const fetchAlltodos = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("http://localhost:999/api/getallTodo", {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setTodos(data.alltodos || []); // Fallback for undefined data
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Alltodos
  useEffect(() => {
    fetchAlltodos();
  }, [newtodo]); // ✅ Empty dependency array

  // Post todo
  const addtodo = async () => {
    if (!newtodo.trim()) return
    try {
      const todo = await axios.post("http://localhost:999/api/createTodo", {
        text: newtodo,
        completed: false
      }, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      });
      console.log("todo-Made :", todo)
      setTodos([...Todos, todo.data])
      console.log("todo-data :", todo.data)
      setnewtodo("")
    } catch (err) {
      setError(`fail to create-todo ${err.response?.data?.message || err.message}`)
    }
  }
  //update todo
  const updatetodo = async (id) => {

    const Updatetodo = Todos.find((t) => t._id === id)
    const updateStatus = !Updatetodo.completed

    try {

      const response = await axios.patch(`http://localhost:999/api/updatebyid/${id}`,
        { completed: updateStatus },
        { withCredentials: true }
      )

      setTodos(Todos.map((todo) => {
        return todo._id === id ? { ...todo, completed: updateStatus } : todo
      }))
    } catch (err) {
      setError("fail to update :", err)
      setTodos([...Todos])
    }
  }

  // Delete todo
  const deletetodo = async (id) => {
    console.log("you clicked on delete btn :")
    try {
      await axios.delete(`http://localhost:999/api/deletebyid/${id}`, {
        withCredentials: true
      })
      setTodos(Todos.filter((t) => t._id !== id))
    } catch (err) {
      setError(`error in deletetodo frontend ${err.message}:`)
    }
  }

  // userLogout

  return (
    <todoContext.Provider value={{
      Todos,
      Loading,
      Error,
      newtodo,
      setnewtodo,
      addtodo,
      updatetodo,
      deletetodo
    }}>
      {children}
    </todoContext.Provider>
  );
};