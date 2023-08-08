import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { EmojiExpressionless } from 'react-bootstrap-icons';

import { useAuth } from '../../hooks';
import routes from '../../routes.js';

function SnippetUnavailable({ handleClose, isOpen }) {
  const { t } = useTranslation();
  const { isLoggedIn } = useAuth();

  const navigate = useNavigate();
  const handleCloseDialogAndNavigate = () => {
    handleClose();
    navigate(isLoggedIn ? routes.myProfilePagePath() : routes.landingPath());
  };

  return (
    <Modal
      centered
      onHide={handleCloseDialogAndNavigate}
      show={isOpen}
      size="sm"
    >
      <Modal.Body>
        <div className="d-flex flex-column gap-3 text-center">
          <EmojiExpressionless className="bi fs-1 align-self-center text-primary m-3" />
          <p>{t('modals.snippetUnavailable.message')}</p>
          <Button onClick={handleCloseDialogAndNavigate} type="button">
            {t('modals.inDevelopment.okButton')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default SnippetUnavailable;
