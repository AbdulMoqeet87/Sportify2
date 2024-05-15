import React, { useState } from 'react';

const SimplePopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => {
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={openPopup}>Open Popup</button>
      {isOpen && (
        <div className="popup">
          <div className="popup-content">
            <h2>This is a simple popup</h2>
            <p>You can put any content here.</p>
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimplePopup;