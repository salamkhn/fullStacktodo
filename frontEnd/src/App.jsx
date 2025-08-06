import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom"
import { Toaster } from 'react-hot-toast';


import Home from "./components/Home";
import { Login } from "./components/Login"
import { Signup } from "./components/singup"
import NotFound from "./components/NotFound"


const App = () => {



  const token = localStorage.getItem("jwt")

  console.log("token in app :", token)



  console.log("token in app :", token)
  return (<>
    <Router>
      <Routes>
        <Route path="/" element={token ? <Home /> : <Navigate to={"/login"} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  </>)
}
export default App