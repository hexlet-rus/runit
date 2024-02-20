import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { actions } from '../../slices';

function AttemptDuplicateSnippet({ handleClose, isOpen }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  //   const handleCopy = () => {};
  const handleSignin = () => {
    dispatch(
      actions.openModal({
        type: 'signingIn',
      }),
    );
  };

  return (
    <Modal centered keyboard onHide={handleClose} show={isOpen}>
      <Modal.Header className="py-3" closeButton>
        <Modal.Title>{t('modals.attemptDuplicateSnippet.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex flex-column gap-3">
        <Button variant="primary">
          {t('modals.attemptDuplicateSnippet.copyButton')}
        </Button>
        <p className="d-flex justify-content-center my-0">
          {t('modals.attemptDuplicateSnippet.or')}
        </p>
        <Button variant="outline-primary" onClick={handleSignin}>
          {t('modals.attemptDuplicateSnippet.signinButton')}
        </Button>
      </Modal.Body>
    </Modal>
  );
}

export default AttemptDuplicateSnippet;
