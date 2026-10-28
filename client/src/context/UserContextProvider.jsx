import axios from "axios";
import { useState, useEffect } from "react";
import {UserContext} from './UserContext'

export const UserProvider = ({ children }) => {
  
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [isLogIn, setIsLogIn] = useState(false);

  useEffect(() => {
    const validateAuth = async () => {
      try {
        setLoading(true)
        const response = await axios.post(`http://localhost:8000/api/auth/validate-auth`, {}, {
          withCredentials: true
        })
        setUser(response?.data)
        setIsLogIn(true)
      } catch (error) {
        console.log(error)
        setLoading(false)
        setIsLogIn(false)
      } finally{
        setLoading(false);
      }
    }
    validateAuth()
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser, loading, setLoading, isLogIn, setIsLogIn }}>
      {children}
    </UserContext.Provider>
  );
};