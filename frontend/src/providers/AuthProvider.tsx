import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../slices';
import { AuthContext } from '../contexts';
import type { ICreateAuthContext } from '../types/context';
import routes from '../routes';
import { fetchUserData } from '../slices/userSlice';

function AuthProvider({ children }: { children: JSX.Element }) {
  const dispatch: AppDispatch = useDispatch();
  const signInStatus = JSON.parse(localStorage.getItem('signInStatus'));
  const [isLoggedIn, setLoggedIn] = useState<boolean>(
    signInStatus ? signInStatus.status : false,
  );
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUserData())
      .unwrap()
      .then(() => {
        setLoggedIn(true);
      })
      .catch(() => {
        localStorage.removeItem('signInStatus');
        localStorage.removeItem('guestUserData');
        setLoggedIn(false);
      });
  }, [dispatch]);

  const memoizedValue: ICreateAuthContext = useMemo(
    () => ({
      signOut: async () => {
        await axios.post(routes.signOutPath());
        localStorage.removeItem('signInStatus');
        setLoggedIn(false);
        navigate(routes.landingPath());
      },

      signIn: () => {
        localStorage.removeItem('guestUserData');
        dispatch(fetchUserData())
          .unwrap()
          .catch((serializedError) => {
            const error = new Error(serializedError.message);
            error.name = serializedError.name;
            throw error;
          });
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
