import React from 'react';

export default function LeaveRoom() {

  // let className = null;
  // if (this.props.match === false) {
  //   className = 'display-none';
  // } else {
  //   className = 'display-modal';
  // }

  // let classText = null;
  // if (this.props.match === false) {
  //   classText = 'Room Closed Successfully';
  // } else {
  //   classText = 'You have left the room';
  // } else {
  //   classText = 'Host has closed the room';
  // }

  // Must use classNames or put in 'display modal' into first div class to see the component rendered
  return (
    <div className={'match-modal container pb-5 justify-content-center flex-column align-items-center display-modal'}>
      <div className="justify-content-center flex-column match-modal-interior-container shadow d-flex">
        <div className="row d-flex justify-content-center h-100">
          <div className="col-12 d-flex justify-content-end align-items-center flex-column">
            <div className="leave-room-icon "> </div>
          </div>
          <div className="col-12 text-align-center color montserrat-700 mb-4"><h4>The room closed successfully!</h4></div>
          <div className="col-12 d-flex justify-content-center">
            <button type="button"
            // onClick={this.props.hide}
              className="btn btn-secondary leave-room-modal-button bg-orange lead">OK</button>
          </div>
        </div>
      </div>
    </div>
  );

}
