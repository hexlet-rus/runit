import React from 'react';
import fileImage from '../../../assets/image/FileTree/file.svg';
import closeImageDirectory from '../../../assets/image/FileTree/closeDirectory.svg';
import openImageDirectory from '../../../assets/image/FileTree/openDirectory.svg';

export function DocumentImage({ type, isShow = false }) {
  if (type === 'file') {
    return <img src={fileImage} alt="" height="20" width="17" />;
  }
  return isShow ? (
    <img src={openImageDirectory} alt="" height="20" width="25" />
  ) : (
    <img src={closeImageDirectory} alt="" height="20" width="25" />
  );
}
