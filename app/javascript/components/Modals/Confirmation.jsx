import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSnippets } from '../../hooks/index.js';

import { actions as modalActions } from '../../slices/modalSlice.js';
import { actions as snippetsActions } from '../../slices/snippetsSlice.js';

function Confirmation() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const snippetApi = useSnippets();
  const { id } = useSelector((state) => state.modal.item);

  const handleSnippetDelete = async (snippetId) => {
    await snippetApi.deleteSnippet(snippetId);
    dispatch(snippetsActions.deleteSnippet(snippetId));
    dispatch(modalActions.closeModal());
  };

  return (
    <Modal
      animation
      centered
      onHide={() => dispatch(modalActions.closeModal())}
      show
    >
      <Modal.Header
        className="bg-dark text-white border-secondary"
        closeButton
        closeVariant="white"
      >
        <Modal.Title
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {t('modals.confirmation.header')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark">
        <div className="d-flex justify-content-between">
          <Button
            variant="secondary"
            onClick={() => dispatch(modalActions.closeModal())}
            type="button"
          >
            {t('modals.confirmation.cancelButton')}
          </Button>
          <Button
            onClick={() => handleSnippetDelete(id)}
            variant="danger"
            type="button"
          >
            {t('modals.confirmation.confirmButton')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default Confirmation;
