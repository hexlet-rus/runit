import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { EmojiExpressionless } from 'react-bootstrap-icons';

import { useAuth } from '../../hooks';
import routes from '../../routes';

function SnippetUnavailable({ handleClose, isOpen }) {
  const { t: tMSU } = useTranslation('translation', {
    keyPrefix: 'modals.snippetUnavailable',
  });
  const { t: tMID } = useTranslation('translation', {
    keyPrefix: 'modals.inDevelopment',
  });
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
          <p>{tMSU('message')}</p>
          <Button onClick={handleCloseDialogAndNavigate} type="button">
            {tMID('okButton')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default SnippetUnavailable;
