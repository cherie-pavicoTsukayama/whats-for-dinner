import React from 'react';

export default class UserJoinRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      error: '',
      errorMessage: '',
      isActive: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      input: event.target.value,
      error: '',
      errorMessage: '',
      isActive: ''
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const entryKey = this.state.input;
    this.props.joinRoom(entryKey);
  }

  componentDidUpdate(prevState) {
    if (this.props.errorMessage !== prevState.errorMessage) {
      this.setState({
        error: 'Invalid Entry Key'
      });
    }
    if (this.props.isActive !== prevState.isActive) {
      this.setState({
        error: 'The room is no longer active'
      });
    }

  }

  render() {
    return (
      <div className={'user-join-room d-flex flex-wrap align-items-center'}>
        <div className={'darken-background'}></div>
        <div>
          <i className="fas fa-chevron-left back-button fa-2x mt-3 ml-3" onClick={ () => this.props.setView('landing page') }></i>
        </div>
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
            <p className="m-0 mt-2 red">{this.state.error}</p>
          </div>
          <button type="submit" className="btn btn-secondary white-button m-3">Join Room</button>
        </form>
      </div>
    );
  }
}
