import React from 'react';

export default function LandingPage(props) {

  return (
    <div className="landing-page-image pb-5 img-fluid">
      <div className="transparent-white-bg d-flex justify-content-center shadow">
        <div className="landing-page-logo"></div>
      </div>
      <div className="d-flex flex-nowrap justify-content-around">
        <div className=" p-1 py-3 mx-1 brand-blue-text montserrat-500 instruction-container">
          <h5 className="text-center">1</h5>
          <p className="m-0 text-center instruction-text">
            Make a room and share your entry key with a friend.
          </p>
        </div>
        <div className=" p-1 py-3 mx-1 brand-blue-text montserrat-500 instruction-container">
          <h5 className="text-center">1</h5>
          <p className="m-0 text-center instruction-text">
            Make a room and share your entry key with a friend.
          </p>
        </div>
        <div className=" p-1 m py-3 mx-1 brand-blue-text montserrat-500 instruction-container">
          <h5 className="text-center">1</h5>
          <p className="m-0 text-center instruction-text">
            Make a room and share your entry key with a friend.
          </p>
        </div>
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
