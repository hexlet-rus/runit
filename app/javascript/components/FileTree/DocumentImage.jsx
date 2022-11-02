import React from 'react';
import fileImage from '../../../assets/images/FileTree/file.svg';
import closeImageDirectory from '../../../assets/images/FileTree/closeDirectory.svg';
import openImageDirectory from '../../../assets/images/FileTree/openDirectory.svg';

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
