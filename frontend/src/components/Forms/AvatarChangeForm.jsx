import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { XCircle } from 'react-bootstrap-icons';

import { actions as modalActions } from '../../slices/modalSlice.js';

import Avatar from '../Avatar/index.jsx';

function AvatarChangeForm() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.userInfo.username);

  const handleInDevelopment = () => {
    dispatch(modalActions.openModal({ type: 'inDevelopment' }));
  };

  return (
    <div className="d-flex flex-column align-items-center gap-2">
      <div
        className="img-thumbnail rounded-circle overflow-hidden"
        style={{ width: '14rem', height: '14rem' }}
      >
        <Avatar username={username} />
      </div>
      <Button
        className="position-relative"
        onClick={handleInDevelopment}
        style={{ marginTop: '-2rem' }}
        variant="primary"
      >
        {t('profileSettings.updateButton')}
      </Button>
      <Button
        onClick={handleInDevelopment}
        size="sm"
        variant="nofill-secondary"
      >
        <XCircle className="bi" /> {t('profileSettings.removeButton')}
      </Button>
    </div>
  );
}

export default AvatarChangeForm;
