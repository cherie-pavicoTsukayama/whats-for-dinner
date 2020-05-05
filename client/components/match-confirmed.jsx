import React from 'react';

function Matchconfirmed() {

  return (
    <div className="container d-flex justify-content-center flex-column align-items-center one-hundred-view-height">
      <div className="row w-100">
        <div className="col-9">
          <h1 className="display-4">Match!</h1>
        </div>
        <div className="col-3"> Awesome!</div>
      </div>
      <div className="row">
        <div className="col">
          <button type="button" className="btn btn-secondary blue-rounded-button m-3">View Matches</button>
        </div>
      </div>
    </div>
  );
}

export default Matchconfirmed;
