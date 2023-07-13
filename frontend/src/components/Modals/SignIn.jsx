import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { actions as modalActions } from '../../slices/modalSlice';
import SignInForm from '../Forms/SignInForm';

function SignInModal() {
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
          {t('modals.signInHeader')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark text-white">
        <SignInForm
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
          onClick={() => dispatch(modalActions.closeModal())}
          style={{ width: 'calc(20% - 10px)' }}
        >
          {t('modals.cancelButton')}
        </Button>
        <div className="gap" style={{ marginLeft: 'auto' }} />
        <Button
          variant="outline-primary"
          className="bt-lg"
          onClick={() =>
            dispatch(modalActions.openModal({ type: 'signingUp' }))
          }
        >
          {t('modals.signUpButton')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SignInModal;
