import React from 'react';

function RoomClosedModal(props) {
  let className = null;
  if (props.isRoomClosed === false) {
    className = 'display-modal';
  } else {
    className = 'display-none';
  }

  return (

    <div className={`match-modal container pb-5  ${className}`}>
      <div className=" d-flex justify-content-center flex-column align-items-center match-modal-interior-container shadow">
        <img src="" alt=""/>
        <p className="text-center montserrat-500 lead brand-blue-text">Sorry this room <br/> has been closed</p>
        <button
          type="button"
          onClick={props.hideRoomClosedModal}
          className="btn orange-rounded-button shadow-sm">
              Ok
        </button>
      </div>
    </div>
  );

}
export default RoomClosedModal;
