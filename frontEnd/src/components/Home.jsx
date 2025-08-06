import React from 'react'
import TodoContext from './context/createContext';
import { useContext } from 'react';
import { useNavigate } from "react-router-dom"
import toast from 'react-hot-toast';
import axios from 'axios';






const Home = () => {


  const Navigate = useNavigate()

  const userLogout = async () => {

    console.log("you clicked at logout")

    try {
      await axios.get("http://localhost:999/api/user/logout", {
        withCredentials: true
      })
      Navigate("/login")
      toast.success("user logout successfully")
      localStorage.removeItem("jwt")



    } catch (err) {
      toast.error(err.message)
    }
  }
  const todosContext = useContext(TodoContext);
  console.log("todosContext :", todosContext)

  const {
    Error,
    Loading,
    Todos,
    newtodo,
    setnewtodo,
    addtodo,
    updatetodo,
    deletetodo } = todosContext
  console.log("todo from context :", Todos)
  return (<>
    <div className='bg-[#711DB0] py-5 px-4 flex flex-col items-center justify-center text-white rounded-2xl shadow-2xl'>
      <h1 className='text-[3rem] font-serif'>Todo App</h1>
      <div className='flex flex-row gap-8'>
        <input onKeyDown={(e) => e.key === "Enter" && addtodo()} value={newtodo} onChange={(e) => setnewtodo(e.target.value)} className='py-4 px-3 w-[19rem] text-2xl' type="text" placeholder='add a new todo' />
        <button onClick={() => addtodo()} className='py-3 border-4 py-3 px-10 rounded-md text-2xl cursor-pointer '>Add</button>
      </div>
      <ul className=' w-full py-4 px-2 mt-3 '>
        {
          Todos && Todos.map((todo, index) => {

            return <li key={todo._id || index} className='flex flex-row justify-between gap-7 space-y-6 '>
              <div className='flex flex-row items-center justify-between gap-7 '>
                <input onChange={() => updatetodo(todo._id)} checked={todo.completed} className='h-[30px] text-2xl cursor-pointer transform scale-150 ' type="checkbox" />
                <span className={`text-2xl ${todo.completed ? "line-through" : ""}`}>{todo.text}</span>
              </div>
              <button onClick={() => deletetodo(todo._id)} className='py-3 px-3 my-1 cursor-pointer bg-blue-700 rounded-2xl text-2xl'>Delete</button>
            </li>





          })
        }
      </ul>
      <button
        onClick={userLogout}

        className='bg-black py-4 px-4 rounded-md text-2xl cursor-pointer'>Logout</button>
    </div>
  </>)
}

export default Home
