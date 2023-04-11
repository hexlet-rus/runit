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

  const getOAuthCodeUrl = () => {
    const url = new URL(process.env.REACT_APP_OAUTH_AUTHORIZE_URL);
    url.searchParams.set('client_id', process.env.REACT_APP_OAUTH_CLIENT_ID);

    return url.toString();
  };

  const oAuth = async (code) => {
    const response = await axios.post(routes.oAuthPath(), { code });
    console.log('data: ', response);
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
    () => ({ logOut, isLoggedIn, logIn, oAuth, getOAuthCodeUrl }),
    [logOut, isLoggedIn, logIn],
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
