import React from 'react';

export default function LandingPage(props) {

  return (
    <div className="landing-page-image pb-4">
      <div className="header-container mb-5">
        <div className="transparent-white-bg d-flex justify-content-center shadow">
          <div className="landing-page-logo"></div>
        </div>
      </div>
      <div className="my-2 d-flex flex-wrap align-content-between justify-content-center landing-page-layout">
        <div className="col-md-8 col-lg-5 d-flex flex-nowrap justify-content-around mt-3">
          <div className=" p-2  py-2 mx-1 brand-blue-text montserrat-500 instruction-container shadow">
            <h5 className="text-center">1</h5>
            <p className=" text-center instruction-text">
              Make a room  and share your entry key with a friend.
            </p>
          </div>
          <div className=" p-2  py-2 mx-1 brand-blue-text montserrat-500 instruction-container shadow">
            <h5 className="text-center">2</h5>
            <p className=" text-center instruction-text">
              Already have an entry key? Join your friend&apos;s room!
            </p>
          </div>
          <div className=" p-2  m py-2 mx-1 brand-blue-text montserrat-500 instruction-container shadow">
            <h5 className="text-center">3</h5>
            <p className=" text-center instruction-text">
              Start liking restaurants and match with a friend!
            </p>
          </div>
        </div>
        <div className="col-12 d-flex flex-wrap justify-content-center mt-auto">
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
