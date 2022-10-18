import React from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { actions as modalActions } from '../../slices/modalSlice.js';
import { useTranslation } from 'react-i18next';

function Info() {
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
      <Modal.Header closeButton className="border-bottom-0">
      </Modal.Header>

      <Modal.Body>
        <div>
          <h5>{t('modals.infoBody')}</h5>
        </div>
        <div
          className="d-flex mt-5"
          style={{ justifyContent: 'flex-end', columnGap: "12px"}}
        >
          <Button
            variant="danger"
            className="bt-lg"
            style={{ width: "calc(20% - 10px)"}}
            onClick={() => dispatch(modalActions.closeModal())}
          >
            {t('modals.cancelButton')}
          </Button>
          <div className="gap" style={{ marginLeft: 'auto'}} />
          <Button
            variant="outline-success"
            className="bt-lg"
            style={{ width: "calc(35% - 10px)"}}
            onClick={() => dispatch(modalActions.openModal({ type: 'signingIn'}))}
          >
            {t('modals.signInButton')}
          </Button>
          <Button
            variant="outline-primary"
            className="bt-lg"
            style={{ width: "calc(35% - 10px)"}}
            onClick={() => dispatch(modalActions.openModal({ type: 'signingUp'}))}
          >
            {t('modals.signUpButton')}
          </Button>
        </div>

      </Modal.Body>
    </Modal>
  );
};

export default Info;
