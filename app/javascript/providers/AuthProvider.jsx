import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts';
import routes from '../routes.js';

function AuthProvider({ children }) {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const logOut = async () => {
    await axios.post(routes.logoutPath());
    setLoggedIn(false);
  };

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

  const auth = useMemo(() => ({ logOut, isLoggedIn }), []);
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
