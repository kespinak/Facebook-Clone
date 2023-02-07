import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  );  // this returns a string...so we need to use json parse to return a boolean

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(currentUser)); // You can't store an object inside local storage (it has to be a string)
  }, [currentUser]);

  const login = async (inputs) => {
    const res = await axios.post('http://localhost:8800/api/auth/login', inputs, {
      withCredentials: true
    });
    setCurrentUser(res.data)

    //TEMPORARY USER FOR FRONTEND
    // setCurrentUser(
    //   {
    //     id: 1,
    //     name: 'Kevin Espina',
    //     profilePicture: 'https://images.pexels.com/photos/262391/pexels-photo-262391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    //   }
    // );
  };

  return(
    <AuthContext.Provider value={{ currentUser, login }} >
      {children}
    </AuthContext.Provider>
  );
};