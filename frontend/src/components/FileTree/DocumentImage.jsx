import React from 'react';
import fileImage from '../../assets/images/FileTree/file.svg';
import closeImageDirectory from '../../assets/images/FileTree/closeDirectory.svg';
import openImageDirectory from '../../assets/images/FileTree/openDirectory.svg';

export function DocumentImage({ type, isShow = false }) {
  if (type === 'file') {
    return <img alt="" height="20" src={fileImage} width="17" />;
  }
  return isShow ? (
    <img alt="" height="20" src={openImageDirectory} width="25" />
  ) : (
    <img alt="" height="20" src={closeImageDirectory} width="25" />
  );
}
