import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { faker } from '@faker-js/faker';
import axios from 'axios';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import routes from '../../routes';
import { actions } from '../../slices';
import { useAuth } from '../../hooks';

const generateGuestUserData = () => {
  const username = `guest_${faker.string.alphanumeric(5)}`;
  const email = `${username}@hexlet.com`;
  const password = `guest_${faker.internet.password()}`;
  return { username, email, password };
};

function AttemptDuplicateSnippet({ handleClose, isOpen }) {
  const { t } = useTranslation();
  const auth = useAuth();
  const dispatch = useDispatch();
  const { currSnippetName, code } = useSelector(({ modal }) => modal.item);

  const handleCopy = async () => {
    const guestData = generateGuestUserData();

    try {
      await axios.post(routes.usersPath(), guestData);
      auth.signIn();
      localStorage.setItem(
        'guestUserData',
        JSON.stringify({
          guestId: guestData.password,
        }),
      );
    } catch (err) {
      if (!err.isAxiosError) {
        console.log('errors.unknown');
        throw err;
      }
      if (
        err.response?.status === 400 &&
        Array.isArray(err.response?.data?.errs?.message)
      ) {
        // случай, когда случайно сгенерировался username или email, который уже есть в базе
        console.log(t('errors.network'));
        throw err;
      } else {
        console.log(t('errors.network'));
        throw err;
      }
    }

    dispatch(
      actions.openModal({
        type: 'duplicateSnippet',
        item: {
          currSnippetName,
          ownerUsername: guestData.username,
          code,
        },
      }),
    );
  };

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
        <Button variant="primary" onClick={handleCopy}>
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
