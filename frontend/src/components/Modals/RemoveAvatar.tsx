import { Button, Modal, FormGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserSettings } from '../../slices/userSettingsSlice';
import { RootReducerType } from 'src/types/slices';
import { AppDispatch } from 'src/slices';

function RemoveAvatar({ handleClose, isOpen }) {
  const { t: tMRA } = useTranslation('translation', {
    keyPrefix: 'modals.removeAvatar',
  });
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useSelector((state: RootReducerType) => state.user.userInfo);
  const { loadingStatus } = useSelector((state: RootReducerType) => state.userSettings);

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
    <Modal centered onHide={handleClose} show={isOpen} > { /* Here was a size attr that had value (size='m') but, => Type '"m"' is not assignable to type '"sm" | "lg" | "xl"' */ }
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
