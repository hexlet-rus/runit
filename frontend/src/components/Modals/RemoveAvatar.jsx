import { Button, Modal, FormGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

function RemoveAvatar({ handleClose, isOpen }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <Modal centered onHide={handleClose} show={isOpen} size="m">
      <Modal.Body>
        <div className="text-center">
          <p>{t('modals.removeAvatar.message')}</p>
        </div>
        <FormGroup className="d-flex justify-content-center">
          <Button onClick={handleClose} variant="danger" className="me-5 px-4">
            {t('modals.removeAvatar.removeButton')}
          </Button>
          <Button onClick={handleClose} variant="secondary" className="px-4">
            {t('modals.removeAvatar.cancelButton')}
          </Button>
        </FormGroup>
      </Modal.Body>
    </Modal>
  );
}

export default RemoveAvatar;
