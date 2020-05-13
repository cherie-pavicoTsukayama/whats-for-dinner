import React from 'react';

export default function HostJoinRoom(props) {
  const onClick = () => {
    props.joinRoom(props.entryKey)
      .then(() => props.setView('voting room'))
      .catch(err => console.error(err));

  };

  return (
    <div className={'host-join-room m-0 d-flex flex-wrap justify-content-center align-items-center'}>
      <div className={'darken-background'}></div>
      <div className= {'col-sm-12 m-0 p-0'}>
        <div className={'col-sm-12 white-transparent-background pt-3 pb-3 mb-5'}>
          <p className={'text-center montserrat-400 black-font-p  lead mb-0'}>
            Your room with entry key
            <br />
            <span className="color bigger-font"><u> { props.entryKey }</u></span>
            <br />
            has been created
          </p>
        </div>
        <div className="col-sm-12 d-flex flex-wrap justify-content-center">
          <button
            type="button"
            className="btn btn-secondary white-button m-3 lead"
            onClick={onClick}>
              Join Room
          </button>
        </div>
      </div>
    </div>
  );
}
