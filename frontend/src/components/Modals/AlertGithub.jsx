import React from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { actions as modalActions } from '../../slices/modalSlice.js';

function AlertGithub() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <Modal
      animation
      centered
      onHide={() => dispatch(modalActions.closeModal())}
      show
      cl
    >
      <Modal.Header
        closeButton
        closeVariant="white"
        className="text-white bg-dark border-secondary"
      >
        <Modal.Title className="display-7">
          {t('modals.alertGithubHeader')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark text-white">
        <p style={{ textAlign: 'center' }}>{t('errors.githubPublicEmail')}</p>
      </Modal.Body>
    </Modal>
  );
}

export default AlertGithub;
