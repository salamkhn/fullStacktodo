import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { StateContext } from './components/context/stateContext'



createRoot(document.getElementById('root')).render(
  <StateContext>
    <App />
  </StateContext>


)
