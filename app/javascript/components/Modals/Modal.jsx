import React from 'react';
import { useSelector } from 'react-redux';
import InfoModal from './Info.jsx';
import SignUpModal from './SignUp.jsx';
import SignInModal from './SignIn.jsx';
import SaveReplModal from './SaveRepls.jsx';
import GetLinkModal from './GetLink.jsx';

const modals = {
  gettingInfo: InfoModal,
  savingRepl: SaveReplModal,
  signingUp: SignUpModal,
  signingIn: SignInModal,
  gettingLink: GetLinkModal,
};

function ModalWindow() {
  const modalType = useSelector((state) => state.modal.type);
  const Modal = modals[modalType];
  if (!Modal) {
    return null;
  }
  return (
    <Modal />
  );
};

export default ModalWindow;
