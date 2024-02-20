import { ToastContainer } from 'react-toastify';
import { useTernaryDarkMode } from 'usehooks-ts';

function Toast() {
  const { isDarkMode } = useTernaryDarkMode();

  return (
    <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={isDarkMode ? 'dark' : 'light'}
    />
  );
}

export default Toast;
