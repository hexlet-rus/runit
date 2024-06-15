import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { XCircle } from 'react-bootstrap-icons';

import { actions as modalActions } from '../../slices/modalSlice.js';

import Avatar from '../Avatar/index.jsx';

function AvatarChangeForm() {
  const { t: tPS } = useTranslation('translation', { keyPrefix: 'profileSettings' });
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.userInfo.username);

  const handleEditAvatar = (type) => () => {
    dispatch(modalActions.openModal(type));
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
        onClick={handleEditAvatar({ type: 'changeAvatar' })}
        style={{ marginTop: '-2rem' }}
        variant="primary"
      >
        {tPS('updateButton')}
      </Button>
      <Button
        onClick={handleEditAvatar({ type: 'removeAvatar' })}
        size="sm"
        variant="nofill-secondary"
      >
        <XCircle className="bi" /> {tPS('removeButton')}
      </Button>
    </div>
  );
}

export default AvatarChangeForm;
