import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { actions } from '../../slices';
import SignupForm from '../Forms/SignUpForm';
import GuestSignupForm from '../Forms/GuestSignUpForm';
import { useAuth } from '../../hooks';

function SignUpModal({ handleClose, isOpen }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const auth = useAuth();

  const guestUser = localStorage.getItem('guestUserData');

  return (
    <Modal centered onHide={handleClose} show={isOpen}>
      <Modal.Header className="py-3" closeButton>
        <Modal.Title className="display-6">
          {t('signUp.pageHeader')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {auth.isLoggedIn && guestUser ? (
          <GuestSignupForm />
        ) : (
          <SignupForm onSuccess={handleClose} />
        )}
        {!guestUser && (
          <div className="d-flex justify-content-center align-items-baseline mt-5">
            <span className="text-body-secondary">
              {t('signUp.footer.signInHeader')}
            </span>{' '}
            <Button
              onClick={() => dispatch(actions.openModal({ type: 'signingIn' }))}
              variant="link"
            >
              {t('profileActions.signIn')}
            </Button>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default SignUpModal;
