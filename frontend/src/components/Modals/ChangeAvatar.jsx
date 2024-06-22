import { Button, Modal, FormControl, FormLabel, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';

function ChangeAvatar({ handleClose, isOpen }) {
  const { t: tMCA } = useTranslation('translation', {
    keyPrefix: 'modals.changeAvatar',
  });
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
          border={0}
          className="rounded-circle"
          height={250}
          image={avatarState.img}
          rotate={0}
          scale={avatarState.scale}
          width={250}
        />
      </div>
      <Modal.Body className="text-center py-3">
        <Form.Range
          max={20}
          min={10}
          onChange={(e) =>
            setAvatarState({ ...avatarState, scale: e.target.value / 10 })
          }
        />
        <Button onClick={handleInputClick}>
          <FormLabel
            className="text-white m-1 fs-6"
            htmlFor="customFile1"
            onClick={handleLabelClick}
          >
            {tMCA('chooseFileButton')}
          </FormLabel>
          <FormControl
            ref={fileInputRef}
            className="form-control d-none"
            id="customFile1"
            onChange={(e) =>
              setAvatarState({
                ...avatarState,
                img: e.target.files[0],
                imageChosen: true,
              })
            }
            type="file"
          />
        </Button>
        <div>
          <Button
            className="mt-3 me-3"
            disabled={!avatarState.imageChosen}
            onClick={handleClose}
            variant="success"
          >
            {tMCA('uploadButton')}
          </Button>
          <Button className="mt-3" onClick={handleClose} variant="secondary">
            {tMCA('cancelButton')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ChangeAvatar;
