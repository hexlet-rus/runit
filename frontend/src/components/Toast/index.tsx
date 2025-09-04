import { ToastContainer } from 'react-toastify';
import { useTernaryDarkMode } from 'usehooks-ts';

function Toast() {
  const { isDarkMode } = useTernaryDarkMode();

  return (
    <ToastContainer
      autoClose={3000}
      closeOnClick
      draggable
      hideProgressBar
      newestOnTop={false}
      pauseOnFocusLoss
      pauseOnHover
      position="top-center"
      rtl={false}
      theme={isDarkMode ? 'dark' : 'light'}
    />
  );
}

export default Toast;
