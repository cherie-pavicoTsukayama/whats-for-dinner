import React from 'react';
import MatchConfirmed from './match-confirmed';

export default class App extends React.Component {
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

  componentDidMount() {
    fetch('/api/health-check')
      .then(res => res.json())
      .then(data => this.setState({ message: data.message || data.error }))
      .catch(err => this.setState({ message: err.message }))
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {
    return (
      <div>
        <div className="app-test-picture one-hundred-view-height">
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
