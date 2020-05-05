import React from 'react';

function Matchconfirmed() {

  return (
    <div className="container d-flex justify-content-center flex-column align-items-center one-hundred-view-height">
      <div className="row w-100 row-background">
        <div className="col-8 column-background d-flex justify-content-end flex-column mt-4">
          <h1 className="display-4 match-text match-background">Match!</h1>
        </div>
        <div className="col-4 logo-space"></div>
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
