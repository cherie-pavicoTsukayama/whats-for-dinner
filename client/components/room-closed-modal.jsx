import React from 'react';

function RoomClosedModal(props) {
  let className = null;
  if (props.isRoomClosed === false) {
    className = 'display-modal';
  } else {
    className = 'display-none';
  }

  return (

    <div className={`room-close-modal-container ${className} justify-content-center align-items-center` }>
      <div className=" pb-4 d-flex justify-content-center flex-column align-content-around room-closed-modal shadow">
        <div className="match-icon">
        </div>
        <p className="text-center montserrat-500 lead brand-blue-text">Sorry this room <br/> has been closed</p>
        <button
          type="button"
          onClick={props.hideRoomClosedModal}
          className="btn orange-rounded-button shadow-sm align-self-center">
              Ok
        </button>
      </div>
    </div>
  );
}

export default RoomClosedModal;
