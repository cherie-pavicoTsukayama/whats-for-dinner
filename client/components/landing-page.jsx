import React from 'react';

export default function LandingPage(props) {

  return (
    <div className="landing-page-image pb-5 img-fluid">
      <div className="transparent-white-bg d-flex justify-content-center shadow">
        <div className="landing-page-logo"></div>
      </div>
      <button
        type="button"
        className="btn btn-secondary white-button m-3 shadow"
        onClick={() => props.setViewState('create room')}
      >
        Create Room
      </button>
      <button
        type="button"
        className="btn btn-secondary white-button m-3 shadow"
        onClick={() => props.setViewState('join room')}
      >
        Join Room
      </button>
    </div>
  );
}
