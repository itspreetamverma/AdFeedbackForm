import React from 'react'
import AdFeedbackForm from './Components/AdFeedbackForm'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const App = () => {
  return (
    <div>
      <AdFeedbackForm/>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  )
}

export default App