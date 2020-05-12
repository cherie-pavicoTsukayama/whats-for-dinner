import React from 'react';

export default function LeaveRoom(props) {

  let className = null;
  if (props.isLeaving === false) {
    className = 'display-none';
  } else {
    className = 'display-modal';
  }

  return (
    <div className={`match-modal container pb-5 justify-content-center flex-column align-items-center ${className}`}>
      <div className="justify-content-center flex-column match-modal-interior-container shadow d-flex">
        <div className="row d-flex justify-content-center h-100">
          <div className="col-12 d-flex justify-content-end align-items-center flex-column">
            <div className="leave-room-icon "></div>
          </div>
          <div className="col-12 text-align-center color montserrat-700 mb-4"><h4>Are you sure you want to leave?</h4></div>
          <div className="col-12 d-flex justify-content-center">
            <button type="button"
              onClick={props.leave}
              className="btn btn-danger leave-room-decision-button lead mr-2">Yes</button>
            <button type="button"
              onClick={props.hide}
              className="btn btn-secondary leave-room-decision-button brand-blue lead ml-2">No</button>
          </div>
        </div>
      </div>
    </div>
  );

}
