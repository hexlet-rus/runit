import { Button, Modal, FormGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserSettings } from '../../slices/userSettingsSlice';

function RemoveAvatar({ handleClose, isOpen }) {
  const { t: tMRA } = useTranslation('translation', {
    keyPrefix: 'modals.removeAvatar',
  });
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.user.userInfo);
  const { loadingStatus } = useSelector((state) => state.userSettings);

  const handleDeleteAvatar = async () => {
    const data = { avatar_base64: null };
    dispatch(updateUserSettings({ id, data })).then((req) => {
      if (!req.error) {
        handleClose();
      } else {
        toast.error('Ошибка сети');
      }
    });
  };

  return (
    <Modal centered onHide={handleClose} show={isOpen} size="m">
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
