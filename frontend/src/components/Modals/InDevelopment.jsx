import { useTranslation } from 'react-i18next';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Tools } from 'react-bootstrap-icons';

function InDevelopment({ handleClose, isOpen }) {
  const { t: tMID } = useTranslation('translation', { keyPrefix: 'modals.inDevelopment' });

  return (
    <Modal centered onHide={handleClose} show={isOpen} size="sm">
      <Modal.Body>
        <div className="d-flex flex-column gap-3 text-center">
          <Tools className="bi fs-1 align-self-center text-primary m-3" />
          <p>{tMID('message')}</p>
          <Button onClick={handleClose} type="button">
            {tMID('okButton')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default InDevelopment;
