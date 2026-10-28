import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {UserProvider} from "./context/UserContextProvider"
import toast, { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <App />
      <Toaster/>
    </UserProvider>
  </StrictMode>,
)
