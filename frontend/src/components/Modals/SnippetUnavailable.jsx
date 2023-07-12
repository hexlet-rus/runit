import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { actions as modalActions } from '../../slices/modalSlice.js';

function SnippetUnavailable() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const navigate = useNavigate();
  const handleCloseDialogAndNavigate = () => {
    navigate('/');
    dispatch(modalActions.closeModal());
  };

  return (
    <Modal animation centered onHide={handleCloseDialogAndNavigate} show>
      <Modal.Header
        closeButton
        closeVariant="white"
        className="border-bottom-0 bg-dark"
      />

      <Modal.Body className="bg-dark text-white">
        <div className="d-flex flex-column align-items-center">
          <h5 className="text-center">{t('modals.snippetUnavailable')}</h5>
          <Button
            className="align-self-end btn btn-primary"
            onClick={handleCloseDialogAndNavigate}
          >
            Ok
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default SnippetUnavailable;
