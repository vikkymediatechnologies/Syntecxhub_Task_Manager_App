import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)


import { AuthProvider } from "./context/AuthContext";
import { TaskProvider } from "./context/TaskContext";

<AuthProvider>
  <TaskProvider>
    <App />
  </TaskProvider>
</AuthProvider>