import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { XCircle } from 'react-bootstrap-icons';

import type { RootReducerType } from 'src/types/slices';
import { actions as modalActions } from '../../slices/modalSlice';

import Avatar from '../Avatar/index';

function AvatarChangeForm() {
  const { t: tPS } = useTranslation('translation', {
    keyPrefix: 'profileSettings',
  });
  const dispatch = useDispatch();
  const avatar = useSelector(
    (state: RootReducerType) => state.userSettings.avatar,
  );
  const username = useSelector(
    (state: RootReducerType) => state.user.userInfo.username,
  );

  const handleEditAvatar =
    (type: { type: 'changeAvatar' | 'removeAvatar' }) => () => {
      dispatch(modalActions.openModal(type));
    };

  return (
    <div className="d-flex flex-column align-items-center gap-2">
      <div
        className="img-thumbnail rounded-circle overflow-hidden"
        style={{ width: '14rem', height: '14rem' }}
      >
        {avatar ? (
          <img
            alt=""
            className="rounded-circle overflow-hidden h-100"
            height="100%"
            src={avatar}
            width="100%"
          />
        ) : (
          <Avatar username={username} />
        )}
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
        disabled={!avatar}
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
