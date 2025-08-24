import type { AppDispatch } from 'src/slices';
import { Button, Modal, FormGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import type { RootReducerType } from 'src/types/slices';
import { updateUserSettings } from '../../slices/userSettingsSlice';

function RemoveAvatar({ handleClose, isOpen }) {
  const { t: tMRA } = useTranslation('translation', {
    keyPrefix: 'modals.removeAvatar',
  });
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useSelector((state: RootReducerType) => state.user.userInfo);
  const { loadingStatus } = useSelector(
    (state: RootReducerType) => state.userSettings,
  );

  const handleDeleteAvatar = async () => {
    const data = { avatar_base64: null };
    dispatch(updateUserSettings({ id, data })).then((res) => {
      if (res.type.endsWith('/fulfilled')) {
        handleClose();
      } else {
        toast.error('Ошибка сети');
      }
    });
  };

  return (
    <Modal centered onHide={handleClose} show={isOpen}>
      <Modal.Body>
        <div className="text-center">
          <p>{tMRA('message')}</p>
        </div>
        <FormGroup className="d-flex justify-content-center">
          <Button
            className="me-5 px-4"
            disabled={loadingStatus === 'loading'}
            onClick={handleDeleteAvatar}
            variant="danger"
          >
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
