import { Button, Modal, FormControl, FormLabel, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';

function ChangeAvatar({ handleClose, isOpen }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [avatarState, setAvatarState] = useState({
    scale: 1,
    img: null,
    imageChosen: false,
  });

  const fileInputRef = useRef(null);

  const handleInputClick = () => fileInputRef.current.click();
  const handleLabelClick = (e) => e.stopPropagation();

  return (
    <Modal centered onHide={handleClose} show={isOpen} size="sm">
      <div className="m-2 text-center">
        <AvatarEditor
          image={avatarState.img}
          width={250}
          height={250}
          border={0}
          scale={avatarState.scale}
          rotate={0}
          className="rounded-circle"
        />
      </div>
      <Modal.Body className="text-center py-3">
        <Form.Range
          onChange={(e) =>
            setAvatarState({ ...avatarState, scale: e.target.value / 10 })
          }
          min={10}
          max={20}
        />
        <Button onClick={handleInputClick}>
          <FormLabel
            htmlFor="customFile1"
            className="text-white m-1 fs-6"
            onClick={handleLabelClick}
          >
            {t('modals.changeAvatar.chooseFileButton')}
          </FormLabel>
          <FormControl
            type="file"
            className="form-control d-none"
            id="customFile1"
            ref={fileInputRef}
            onChange={(e) =>
              setAvatarState({
                ...avatarState,
                img: e.target.files[0],
                imageChosen: true,
              })
            }
          />
        </Button>
        <div>
          <Button
            onClick={handleClose}
            className="mt-3 me-3"
            variant="success"
            disabled={!avatarState.imageChosen}
          >
            {t('modals.changeAvatar.uploadButton')}
          </Button>
          <Button onClick={handleClose} className="mt-3" variant="secondary">
            {t('modals.changeAvatar.cancelButton')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ChangeAvatar;
