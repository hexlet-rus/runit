import { useDispatch, useSelector } from 'react-redux';

import { actions } from '../../slices';

import SignUpModal from './SignUp.jsx';
import SignInModal from './SignIn.jsx';
import ShareSnippet from './ShareSnippet.jsx';
import InDevelopment from './InDevelopment.jsx';
import SnippetUnavailable from './SnippetUnavailable.jsx';
import DuplicateSnippetModal from './DuplicateSnippetModal';

const modals = {
  signingUp: SignUpModal,
  signingIn: SignInModal,
  sharingSnippet: ShareSnippet,
  inDevelopment: InDevelopment,
  snippetUnavailable: SnippetUnavailable, // #TODO: Remove this modal once proper re-direct is configured on the backend,
  duplicateSnippet: DuplicateSnippetModal,
};

function ModalWindow() {
  const dispatch = useDispatch();
  const { isOpen, type } = useSelector((state) => state.modal);

  const handleClose = () => dispatch(actions.closeModal());

  const Modal = modals[type];
  if (!Modal) {
    return null;
  }
  return <Modal handleClose={handleClose} isOpen={isOpen} />;
}

export default ModalWindow;
