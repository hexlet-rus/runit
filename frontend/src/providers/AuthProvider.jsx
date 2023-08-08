import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../contexts';
import routes from '../routes.js';
import { fetchUserData } from '../slices/userSlice.js';

function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const loginStatus = JSON.parse(localStorage.getItem('loginStatus'));
  const [isLoggedIn, setLoggedIn] = useState(
    loginStatus ? loginStatus.status : false,
  );
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUserData())
      .unwrap()
      .then(() => {
        setLoggedIn(true);
      })
      .catch(() => {
        localStorage.removeItem('loginStatus');
        setLoggedIn(false);
      });
  }, [dispatch]);

  const memoizedValue = useMemo(
    () => ({
      signOut: async () => {
        await axios.post(routes.signOutPath());
        localStorage.removeItem('loginStatus');
        setLoggedIn(false);
        navigate(routes.landingPath());
      },

      signIn: () => {
        dispatch(fetchUserData())
          .unwrap()
          .catch((serializedError) => {
            const error = new Error(serializedError.message);
            error.name = serializedError.name;
            throw error;
          });
        localStorage.setItem('loginStatus', JSON.stringify({ status: true }));
        setLoggedIn(true);
      },
      isLoggedIn,
    }),
    [dispatch, isLoggedIn, navigate],
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
