import React from 'react';

const DanModal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "dan-modal display-block" : "dan-modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="dan-modal-main">
        {children}
        <br></br>
        <button type="button" onClick={handleClose}>
          Close
        </button>
      </section>
    </div>
  );
};

export default DanModal;