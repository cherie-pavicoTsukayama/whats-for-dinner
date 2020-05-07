import React from 'react';

export default function HostJoinRoom(props) {

  return (
    <div className={'host-join-room m-0 d-flex flex-wrap justify-content-center align-items-center'}>
      <div className={'darken-background'}></div>
      <div className= {'col-sm-12 m-0 p-0'}>
        <div className={'col-sm-12 white-transparent-background pt-3 pb-3 mb-5'}>
          <p className={'text-center montserrat-400 black-font-p  lead mb-0'}>
            Your Room
            <br />
            With Entry Key <span><u> { props.entryKey}</u></span>
            <br />
            Has Been Created
          </p>
        </div>
        <div className="col-sm-12 d-flex flex-wrap justify-content-center">
          <h2 className={'col-sm-12 text-center montserrat-400 grey-font'}>
            <u>{props.entryKey}</u>
          </h2>
          <button type="button" className="btn btn-secondary grey-button m-3 lead" onClick={props.joinRoom}>Join Room</button>
        </div>
      </div>

    </div>
  );
}
