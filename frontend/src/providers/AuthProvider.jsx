import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../contexts';
import routes from '../routes';
import { actions } from '../slices/userSlice';

function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const signInStatus = JSON.parse(localStorage.getItem('signInStatus'));
  const [isLoggedIn, setLoggedIn] = useState(
    signInStatus ? signInStatus.status : false,
  );
  const navigate = useNavigate();
  const statusOfUser = useSelector((state) => state.user.status);

  useEffect(() => {
      if (statusOfUser === 'signedIn') setLoggedIn(true);
      localStorage.removeItem('signInStatus');
      localStorage.removeItem('guestUserData');
      setLoggedIn(false);
  }, [dispatch, statusOfUser]);

  const memoizedValue = useMemo(
    () => ({
      signOut: async () => {
        dispatch(actions.setUserInfo({}));
        dispatch(actions.setUserStatus('signedOut'));
        localStorage.removeItem('signInStatus');
        setLoggedIn(false);
        navigate(routes.landingPath());
      },

      signIn: () => {
        if (statusOfUser === 'signedIn') {
          try {
            localStorage.removeItem('guestUserData');
          } catch (serializedError) {
            const error = new Error(serializedError.message);
            error.name = serializedError.name;
            throw error;
          }
        }
        localStorage.setItem('signInStatus', JSON.stringify({ status: true }));
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
