import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import  { Toaster } from 'react-hot-toast';

import home from "./components/home"
import Home from "./components/home"
import Login from "./components/Login"
import { Signup } from "./components/singup"
import NotFound from "./components/NotFound"
const App = () => {

  return (<>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
        <Toaster />
    </Router>
  </>)
}
export default App