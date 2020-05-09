import React from 'react';

export default class UserJoinRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      input: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const entryKey = this.state.input;
    this.props.joinRoom(entryKey);
  }

  render() {
    let invalidKeyMessage;
    if (this.props.errorMessage) {
      invalidKeyMessage = <p className="m-0 mt-2 red">{this.props.errorMessage}</p>;
    }
    return (
      <div className={'user-join-room d-flex align-items-center'}>
        <div className={'darken-background'}></div>
        <form onSubmit={this.handleSubmit} className={'col-sm-12 p-0 d-flex flex-column align-items-center'}>
          <div className={'col-sm-12 white-transparent-background py-3 mb-5 d-flex flex-column align-items-center'}>
            <input
              required
              className="user-join-input"
              value={this.state.input}
              onChange={this.handleChange}
              type="text"
              placeholder="Entry Key"
              maxLength="8"
              aria-label="Room Entry Key"/>
            {invalidKeyMessage}
          </div>
          <button type="submit" className="btn btn-secondary grey-button m-3">Join Room</button>
        </form>
      </div>
    );
  }
}
