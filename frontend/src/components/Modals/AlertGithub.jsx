import React from 'react';

function AlertGithub({ isOpen, onClose, message }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="AlertGithub">
      <div className="modal-content">
        <p>{message}</p>
        <button type="submit" onClick={onClose}>
          Х
        </button>
      </div>
    </div>
  );
}

export default AlertGithub;
