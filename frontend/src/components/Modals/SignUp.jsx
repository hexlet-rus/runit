import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { actions as modalActions } from '../../slices/modalSlice.js';
import SignupForm from '../Forms/SignUpForm';

function SignUpModal() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <Modal
      animation
      centered
      show
      onHide={() => dispatch(modalActions.closeModal())}
    >
      <Modal.Header
        closeButton
        closeVariant="white"
        className="text-white bg-dark border-secondary"
      >
        <Modal.Title className="display-6">
          {t('modals.signUpHeader')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark text-white">
        <SignupForm
          onSuccess={() => {
            dispatch(modalActions.closeModal());
          }}
        />
      </Modal.Body>
      <Modal.Footer
        className="d-flex bg-dark border-secondary"
        style={{ justifyContent: 'flex-end' }}
      >
        <Button
          variant="danger"
          className="bt-lg"
          style={{ width: 'calc(20% - 10px)' }}
          onClick={() => dispatch(modalActions.closeModal())}
        >
          {t('modals.cancelButton')}
        </Button>
        <div className="gap" style={{ marginLeft: 'auto' }} />
        <Button
          variant="outline-primary"
          className="bt-lg"
          style={{ width: 'calc(35% - 10px)' }}
          onClick={() =>
            dispatch(modalActions.openModal({ type: 'signingIn' }))
          }
        >
          {t('modals.signInButton')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SignUpModal;
