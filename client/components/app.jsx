import React from 'react';

import VotingRoom from './voting-room';
import CreateRoomForm from './create-room-form';

import LandingPage from './landing-page';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      entryKey: 'abc123',
      view: 'landingPage'
    };

    this.joinRoom = this.joinRoom.bind(this);
    this.createRoom = this.createRoom.bind(this);
  }

  joinRoom() {
    fetch(`/api/rooms/${this.state.entryKey}`)
      .then(result => result.json())
      .then(data => {
        this.setState({
          restaurants: data.restaurants,
          view: 'viewRestaurants'
        });
      })
      .catch(err => console.error(err));

  }

  createRoom(room) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(room)
    };
    fetch('/api/rooms', options)
      .then(res => res.json())
      .then(json => {
        this.setState({
          entryKey: json.entryKey
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
    return (this.state.isLoading
      ? <h1>Testing connections...</h1>
      : <h1>{this.state.message.toUpperCase()}</h1>,
    <div>

      <CreateRoomForm joinRoom={this.joinRoom} createRoom={this.createRoom}/>
    </div >

    );
  }
}
