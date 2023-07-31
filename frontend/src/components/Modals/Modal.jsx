import { useDispatch, useSelector } from 'react-redux';
import SignUpModal from './SignUp.jsx';
import SignInModal from './SignIn.jsx';
import ShareSnippet from './ShareSnippet.jsx';
import InDevelopment from './InDevelopment.jsx';

import { actions as modalActions } from '../../slices/modalSlice.js';

const modals = {
  signingUp: SignUpModal,
  signingIn: SignInModal,
  sharingSnippet: ShareSnippet,
  inDevelopment: InDevelopment,
};

function ModalWindow() {
  const dispatch = useDispatch();
  const { isOpen, type } = useSelector((state) => state.modal);

  const handleClose = () => dispatch(modalActions.closeModal());

  const Modal = modals[type];
  if (!Modal) {
    return null;
  }
  return <Modal handleClose={handleClose} isOpen={isOpen} />;
}

export default ModalWindow;
