import React from 'react';
import './FlashMessage.css';

const FlashMessage = ({ message, isVisible, onClose }) => {
  return (
    <div className={`flash-message ${isVisible ? 'visible' : ''}`}>
      <p>{message}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default FlashMessage;
