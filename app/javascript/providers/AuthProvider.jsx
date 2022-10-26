import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts';
import routes from '../routes.js';

function AuthProvider({ children }) {
  const loginStatus = JSON.parse(localStorage.getItem('loginStatus'));
  const [isLoggedIn, setLoggedIn] = useState(loginStatus ? loginStatus.status : false);

  const logOut = async () => {
    await axios.post(routes.logoutPath());
    localStorage.removeItem('loginStatus');
    setLoggedIn(false);
  };

  const logIn = () => {
    localStorage.setItem('loginStatus', JSON.stringify({ status: true }));
    setLoggedIn(true);
  }

  useEffect(() => {
    const fetchAuthData = async () => {
      try {
        await axios.get(routes.userProfilePath());
        setLoggedIn(true);
      } catch (err) {
        setLoggedIn(false);
      }
    };
    fetchAuthData();
  }, []);

  return <AuthContext.Provider value={{ logOut, isLoggedIn, logIn }}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
