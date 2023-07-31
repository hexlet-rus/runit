import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { EmojiExpressionless } from 'react-bootstrap-icons';

function SnippetUnavailable({ handleClose, isOpen }) {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const handleCloseDialogAndNavigate = () => {
    handleClose();
    navigate('/');
  };

  return (
    <Modal animation centered onHide={handleCloseDialogAndNavigate} show>
      <Modal.Header closeButton />

      <Modal.Body>
        <div className="d-flex flex-column gap-3 text-center">
          <EmojiExpressionless className="bi fs-1 align-self-center text-primary m-3" />
          <p>{t('modals.snippetUnavailable.message')}</p>
          <Button onClick={handleClose} type="button">
            {t('modals.inDevelopment.okButton')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default SnippetUnavailable;
