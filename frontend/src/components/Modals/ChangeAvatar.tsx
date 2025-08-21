import { toast } from 'react-toastify';
import { Button, Modal, FormControl, FormLabel, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import React, { useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import Resizer from 'react-image-file-resizer';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserSettings } from '../../slices/userSettingsSlice';
import { FetchedCurrentUser, RootReducerType } from 'src/types/slices';

const resizeFile = (file: Blob) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      250,
      250,
      'JPEG',
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      'base64',
    );
  });

import { AppDispatch } from 'src/slices';

function ChangeAvatar({ handleClose, isOpen }) {
  const dispatch = useDispatch<AppDispatch>();
  const { t: tMCA } = useTranslation('translation', {
    keyPrefix: 'modals.changeAvatar',
  });
  const initialAvatarState = {
    scale: 1,
    img: null,
    isResized: true,
  };
  const [avatarState, setAvatarState] = useState(initialAvatarState);

  const { id } = useSelector((state: RootReducerType) => state.user.userInfo);
  const { loadingStatus } = useSelector((state: RootReducerType) => state.userSettings);
  const fileInputRef = useRef(null);
  const cropRef = useRef(null);

  const handleInputClick = () => fileInputRef.current.click();
  const handleLabelClick = (e: React.MouseEvent) => e.stopPropagation();

  const handleChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    if (
      file.type === 'image/png' ||
      file.type === 'image/bmp' ||
      file.type === 'image/jpeg'
    ) {
      setAvatarState({
        ...avatarState,
        img: file,
      });
    } else {
      toast.error('Неверный формат файла');
      setAvatarState(initialAvatarState);
    }
  };

  const handleSaveAvatar = async () => {
    if (cropRef) {
      setAvatarState({
        ...avatarState,
        isResized: false,
      });
      const dataUrl = cropRef.current.getImage().toDataURL();
      const result = await fetch(dataUrl);
      const blob = await result.blob();
      const image = await resizeFile(blob);
      setAvatarState({
        ...avatarState,
        isResized: true,
      });
      const data = { avatar_base64: image as string };
      dispatch(updateUserSettings({ id, data }))
      .unwrap()
      .then((req: FetchedCurrentUser & { error?: string }) => {
        if (!req.error) {
          handleClose();
          setAvatarState(initialAvatarState);
        } else {
          toast.error('Ошибка сети');
        }
      });
    }
  };

  const handleCancel = () => {
    handleClose();
    setAvatarState(initialAvatarState);
  };

  return (
    <Modal centered onHide={handleClose} show={isOpen} size="sm">
      <div className="m-2 text-center">
        <AvatarEditor
          ref={cropRef}
          backgroundColor="white"
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
            setAvatarState({ ...avatarState, scale: +e.target.value / 10 })
          }
          value={avatarState.scale * 10}
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
            accept="image/png, image/jpeg, , image/bmp"
            className="form-control d-none"
            id="customFile1"
            onChange={handleChangeAvatar}
            type="file"
          />
        </Button>
        <div>
          <p style={{ fontSize: 'small', margin: '5px' }}>
            Формат: jpg, png, bmp
          </p>
          <Button
            className="mt-3 me-3"
            disabled={
              !avatarState.img ||
              !avatarState.isResized ||
              loadingStatus === 'loading'
            }
            onClick={handleSaveAvatar}
            variant="success"
          >
            {tMCA('uploadButton')}
          </Button>
          <Button className="mt-3" onClick={handleCancel} variant="secondary">
            {tMCA('cancelButton')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ChangeAvatar;
