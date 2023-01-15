import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts';
import routes from '../routes.js';

function AuthProvider({ children }) {
  const loginStatus = JSON.parse(localStorage.getItem('loginStatus'));
  const [isLoggedIn, setLoggedIn] = useState(
    loginStatus ? loginStatus.status : false,
  );
  const navigate = useNavigate();

  const logOut = async () => {
    await axios.post(routes.logoutPath());
    localStorage.removeItem('loginStatus');
    setLoggedIn(false);
    navigate(routes.homePagePath());
  };

  const logIn = () => {
    localStorage.setItem('loginStatus', JSON.stringify({ status: true }));
    setLoggedIn(true);
  };

  useEffect(() => {
    const fetchAuthData = async () => {
      try {
        await axios.get(routes.userProfilePath());
        setLoggedIn(true);
      } catch (err) {
        localStorage.removeItem('loginStatus');
        setLoggedIn(false);
      }
    };
    fetchAuthData();
  }, []);

  const memoizedValue = useMemo(
    () => ({ logOut, isLoggedIn, logIn }),
    [logOut, isLoggedIn, logIn],
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
