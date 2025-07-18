import React from 'react';

function ConfirmationPopup({ message, onConfirm, onCancel }) {
  return (
    <div className="popup">
      <p>{message}</p>
      <button onClick={onConfirm}>Yes</button>
      <button onClick={onCancel}>No</button>
    </div>
  );
}

export default ConfirmationPopup;

