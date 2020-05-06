import React from 'react';

function MatchConfirmed(props) {

  let className = null;
  if (props.show === false) {
    className = 'display-none';
  } else {
    className = 'display-modal';
  }

  return (

    <div className={`match-modal container pb-5 justify-content-center flex-column align-items-center ${className}`}>
      <div className="justify-content-center flex-column align-items-center match-modal-interior-container shadow">
        <div className="row w-100">
          <div className="col match-logo"></div>
        </div>
        <div className="row mt-3">
          <div className="col secondary-div">
            <button type="button" onClick={() => { props.hideModal(); }} className="btn btn-secondary blue-rounded-button">View Matches</button>
          </div>
        </div>
      </div>
    </div>
  );

}
export default MatchConfirmed;
