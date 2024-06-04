import { Button, Modal, FormGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

function RemoveAvatar({ handleClose, isOpen }) {
  const { t } = useTranslation();

  return (
    <Modal centered onHide={handleClose} show={isOpen} size="m">
      <Modal.Body>
        <div className="text-center">
          <p>{t('modals.removeAvatar.message')}</p>
        </div>
        <FormGroup className="d-flex justify-content-center">
          <Button className="me-5 px-4" onClick={handleClose} variant="danger">
            {t('modals.removeAvatar.removeButton')}
          </Button>
          <Button className="px-4" onClick={handleClose} variant="secondary">
            {t('modals.removeAvatar.cancelButton')}
          </Button>
        </FormGroup>
      </Modal.Body>
    </Modal>
  );
}

export default RemoveAvatar;
