import React from 'react';

export default function LandingPage(props) {

  return (
    <div className="landing-page-image pb-4">
      <div className="header-container mb-5">
        <div className="transparent-white-bg d-flex justify-content-center shadow">
          <div className="landing-page-logo"></div>
        </div>
      </div>
      <div className="my-2 d-flex flex-wrap align-content-between landing-page-layout">
        <div className="d-flex flex-nowrap justify-content-around mt-3">
          <div className=" p-1 py-2 mx-1 brand-blue-text montserrat-500 instruction-container">
            <h5 className="text-center">1</h5>
            <p className="m-0 text-center instruction-text">
              Make a room <br></br> and share <br></br> your entry key with a friend.
            </p>
          </div>
          <div className=" p-1 py-2 mx-1 brand-blue-text montserrat-500 instruction-container">
            <h5 className="text-center">2</h5>
            <p className="m-0 text-center instruction-text">
              Already have an entry key? <br></br> Join your <br></br>friend&apos;s room!
            </p>
          </div>
          <div className=" p-1 m py-2 mx-1 brand-blue-text montserrat-500 instruction-container">
            <h5 className="text-center">3</h5>
            <p className="m-0 text-center instruction-text">
              Start liking <br></br>restaurants<br></br>and match<br></br>with a friend!
            </p>
          </div>
        </div>
        <div className="d-flex flex-wrap justify-content-center mt-auto">
          <div>
            <button
              type="button"
              className="d-block btn btn-secondary white-button m-3 shadow"
              onClick={() => props.setViewState('create room')}
            >
              Create Room
            </button>
          </div>
          <div>
            <button
              type="button"
              className="btn btn-secondary white-button m-3 shadow"
              onClick={() => props.setViewState('join room')}
            >
              Join Room
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
