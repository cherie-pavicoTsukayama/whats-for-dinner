import React from 'react';
import LandingPage from './landing-page';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      view: 'landingPage'
    };

    this.joinRoom = this.joinRoom.bind(this);
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
          view: 'viewRestaurants'
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
    return (
      this.state.isLoading
        ? <h1>Testing connections...</h1>
        : <h1>{this.state.message.toUpperCase()}</h1>,
      <div>
        <LandingPage />
      </div >
    );
  }
}
