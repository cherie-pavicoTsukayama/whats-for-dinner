import React from 'react';

export default class UserJoinRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={'user-join-room d-flex align-items-center'}>
        <div className={'darken-background'}></div>
        <form className={'col-sm-12 p-0 d-flex flex-column align-items-center'}>
          <div className={'col-sm-12 white-transparent-background py-3 mb-5 d-flex justify-content-center'}>
            <input className="user-join-input" type="text" placeholder="Entry Key" maxLength="8" />
          </div>
          <button type="submit" className="btn btn-secondary grey-button m-3">Join Room</button>
        </form>
      </div>
    );
  }
}
