import React from 'react';

function MatchConfirmed(props) {
  let className = null;
  if (props.match === false) {
    className = 'display-none';
  } else {
    className = 'display-modal';
  }

  return (
    <div className={`match-modal container-fluid justify-content-center flex-column align-items-center pl-0 pr-0 ${className}`}>
      <div className="justify-content-center flex-column align-items-center match-modal-interior-container shadow">
        <div className="row w-100 d-flex justify-content-center">
          <div className="col match-logo"></div>
        </div>
        <div className="row mt-3">
          <div className="col secondary-div">
            <button type="button"
              onClick={props.hide}
              className="btn btn-secondary blue-rounded-button">View Match!</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MatchConfirmed;
