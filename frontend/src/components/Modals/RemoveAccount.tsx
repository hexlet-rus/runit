import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { PersonFillDash } from 'react-bootstrap-icons';

import { RootReducerType } from 'src/types/slices';
import { InitialFormStateType } from 'src/types/components';
import { useAuth } from '../../hooks';
import routes from '../../routes';
import FormAlert from '../Forms/FormAlert';

function RemoveAccount({ handleClose, isOpen }) {
  const { t: tMRA } = useTranslation('translation', {
    keyPrefix: 'modals.removeAccount',
  });
  const { t } = useTranslation();
  const auth = useAuth();

  const [isSubmitting, setSubmitting] = useState(false);
  const userInfo = useSelector((state: RootReducerType) => state.user.userInfo);
  const initialFormState: InitialFormStateType = { state: 'initial', message: '' };
  const [formState, setFormState] = useState(initialFormState);

  const handleRemoveAccount = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setFormState(initialFormState);
    try {
      await axios.delete(routes.deleteUserPath(userInfo.id));
      auth.signOut();
      handleClose();
    } catch (err) {
      if (!err.isAxiosError) {
        setFormState({
          state: 'failed',
          message: 'errors.unknown',
        });
        throw err;
      } else {
        setFormState({
          state: 'failed',
          message: 'errors.network',
        });
        throw err;
      }
    }
    setSubmitting(false);
  };

  return (
    <Modal centered onHide={handleClose} show={isOpen}> { /* Here was a size attr that had 'md' value (size='md) but, => Type '"md"' is not assignable to type '"sm" | "lg" | "xl"' */ }
      <Modal.Body>
        <div className="d-flex flex-column gap-3 text-center">
          <FormAlert
            onClose={() => setFormState(initialFormState)}
            state={formState.state}
          >
            {t(formState.message)}
          </FormAlert>
          <PersonFillDash className="bi fs-1 align-self-center text-danger m-3" />
          <p>
            {tMRA('message')} <b>{tMRA('messageBold')}</b>
          </p>
          <div className="d-flex justify-content-end">
            <Button
              className="me-2"
              disabled={isSubmitting}
              onClick={handleRemoveAccount}
              type="button"
              variant="danger"
            >
              {tMRA('okButton')}
            </Button>
            <Button
              onClick={handleClose}
              type="button"
              variant="outline-danger"
            >
              {tMRA('cancelButton')}
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default RemoveAccount;
