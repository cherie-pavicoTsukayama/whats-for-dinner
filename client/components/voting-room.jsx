import React from 'react';
import MatchConfirmed from './match-confirmed';

export default class VotingRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      match: true
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  showModal() {
    this.setState({ match: true });
  }

  hideModal() {
    this.setState({ match: false });
  }

  render() {
    return (
      <div>
        <MatchConfirmed match={this.state.match} hideModal={this.hideModal} />
      </div >
    );
  }
}
