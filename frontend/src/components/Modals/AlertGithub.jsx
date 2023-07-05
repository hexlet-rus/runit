import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { actions as modalActions } from '../../slices/modalSlice.js';
import routes from '../../routes';

function AlertGithub() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleNavigate = () => {
    dispatch(modalActions.closeModal());
    navigate(routes.loginPagePath());
  }

  return (
<Modal
  animation
  centered
  onHide={() => dispatch(modalActions.closeModal())}
  cl
>
  <Modal.Header
    closeButton
    closeVariant="white"
    className="text-white bg-dark border-secondary"
  >
    <Modal.Title className="display-7">
      {t('modals.alertGithubHeader')}
    </Modal.Title>
  </Modal.Header>
  <Modal.Body className="bg-dark text-white">
    <p>{t('errors.githubPublicEmail')}</p>
  </Modal.Body>
  <Modal.Footer
    className="d-flex bg-dark border-secondary justify-content-center"
    style={{ justifyContent: 'flex-end' }}
  >
    <Button
      variant="primary"
      className="bt-lg"
      style={{ width: 'calc(35% - 10px)' }}
      onClick={handleNavigate}
    >
      {t('modals.redirectButton')}
    </Button>
  </Modal.Footer>

</Modal>
  );
}

export default AlertGithub;
