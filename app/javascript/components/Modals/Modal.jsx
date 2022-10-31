import React from 'react';
import { useSelector } from 'react-redux';
import InfoModal from './Info.jsx';
import SignUpModal from './SignUp.jsx';
import SignInModal from './SignIn.jsx';
import ShareRepl from './ShareRepl.jsx';
import NewRepl from './NewRepl.jsx';

const modals = {
  gettingInfo: InfoModal,
  signingUp: SignUpModal,
  signingIn: SignInModal,
  sharingRepl: ShareRepl,
  genNewRepl: NewRepl,
};

function ModalWindow() {
  const modalType = useSelector((state) => state.modal.type);
  const Modal = modals[modalType];
  if (!Modal) {
    return null;
  }
  return <Modal />;
}

export default ModalWindow;
