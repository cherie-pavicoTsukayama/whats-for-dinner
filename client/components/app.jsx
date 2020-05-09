import React from 'react';
import LandingPage from './landing-page';
import HostJoinRoom from './host-join-room';
import UserJoinRoom from './user-join-room';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      view: 'landing page'
    };

    this.joinRoom = this.joinRoom.bind(this);
    this.setView = this.setView.bind(this);
  }

  setView(screen) {
    this.setState({
      view: screen
    });
  }

  joinRoom(entryKey) {
    fetch(`/api/rooms/${entryKey}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          restaurants: data.restaurants,
          view: 'view restaurants'
        });
      })
      .catch(err => console.error(err));
  }

  componentDidMount() {
    fetch('/api/health-check')
      .then(res => res.json())
      .then(data => this.setState({ message: data.message || data.error }))
      .catch(err => this.setState({ message: err.message }))
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {
    let currentView;
    switch (this.state.view) {
      case 'landing page':
        currentView = <LandingPage setViewState={this.setView}/>;
        break;
      case 'create room':
        // need to be create room screen
        currentView = <HostJoinRoom/>;
        break;
      case 'join room':
        currentView = <UserJoinRoom joinRoom={this.joinRoom}/>;
    }
    return (
      this.state.isLoading
        ? <h1>Testing connections...</h1>
        : <h1>{this.state.message.toUpperCase()}</h1>,
      <div>
        {currentView}
      </div >
    );
  }
}
