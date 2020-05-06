import React from 'react';
import MatchConfirmed from './match-confirmed';

export default class VotingRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      show: false
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  showModal() {
    this.setState({ show: true });
  }

  hideModal() {
    this.setState({ show: false });
  }

  render() {
    return (
      <div>
        <div className="voting-room-picture one-hundred-view-height">
          <button
            type="button"
            onClick={() => {
              this.showModal();
            }}
            className="btn btn-secondary blue-rounded-button">
            View Matches
          </button>
        </div >
        <div>
          <MatchConfirmed show={this.state.show} hideModal={this.hideModal} />
        </div >
      </div >
    );
  }
}
