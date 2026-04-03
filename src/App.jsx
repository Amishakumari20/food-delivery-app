import React from 'react'
import Home from './pages/Home'
import Chatbot from './components/Chatbot'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <div>
      <Home />
      <Chatbot />
      <ToastContainer position="bottom-left" autoClose={2000} />
    </div>
  )
}

export default App