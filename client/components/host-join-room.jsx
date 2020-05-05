import React from 'react';

export default function HostJoinRoom(onClickFunction) {

  return (
    <div className={'host-join-room m-0 d-flex flex-wrap justify-content-center align-items-center'}>
      <div className={'darken-background'}></div>
      <div className= {'col-sm-12 m-0 p-0'}>
        <div className={'col-sm-12 white-transparent-background pt-3 pb-3 mb-5'}>
          <p className={'text-center montserrat-400 black-font-p  lead mb-0'}>Your Room <br /> With Room ID _________ <br /> Has Been Created </p>
        </div>
        <div className="col-sm-6 mb-5 d-flex flex-wrap justify-content-center">
          <p className={'col-sm-12 text-center lead montserrat-400 grey-font'}><u>roomId auto populates</u></p>
          <button type="button" className="btn btn-secondary grey-button m-3 lead" onClick={ onClickFunction }>Join Room</button>
        </div>
      </div>

    </div>
  );

}
