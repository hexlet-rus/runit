import { Button, Modal, FormGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

function RemoveAvatar({ handleClose, isOpen }) {
  const { t: tMRA } = useTranslation('translation', {
    keyPrefix: 'modals.removeAvatar',
  });

  return (
    <Modal centered onHide={handleClose} show={isOpen} size="m">
      <Modal.Body>
        <div className="text-center">
          <p>{tMRA('message')}</p>
        </div>
        <FormGroup className="d-flex justify-content-center">
          <Button className="me-5 px-4" onClick={handleClose} variant="danger">
            {tMRA('removeButton')}
          </Button>
          <Button className="px-4" onClick={handleClose} variant="secondary">
            {tMRA('cancelButton')}
          </Button>
        </FormGroup>
      </Modal.Body>
    </Modal>
  );
}

export default RemoveAvatar;
