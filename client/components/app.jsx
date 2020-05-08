import React from 'react';
import VotingRoom from './voting-room';
import LandingPage from './landing-page';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      view: 'landingPage',
      currentRestaurant: 0,
      restaurants: null
    };
    this.incrementRestaurant = this.incrementRestaurant.bind(this);
    this.decrementRestaurant = this.decrementRestaurant.bind(this);
    this.joinRoom = this.joinRoom.bind(this);
  }

  incrementRestaurant() {
    this.setState({ currentRestaurant: this.state.currentRestaurant + 1 });
    if (this.state.currentRestaurant === this.state.restaurants.length - 1) {
      this.setState({ currentRestaurant: 0 });
    }
  }
  
  decrementRestaurant() {
    this.setState({ currentRestaurant: this.state.currentRestaurant - 1 });
    if (this.state.currentRestaurant === 0) {
      this.setState({ currentRestaurant: this.state.restaurants.length - 1 });
    }
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
    const { message, isLoading, view, currentRestaurant, restaurants } = this.state;
    return (isLoading
      ? <h1>Testing connections...</h1>
      : <h1>{message.toUpperCase()}</h1>,
    <div>
      <LandingPage />
      {/* <VotingRoom currentRestaurant={currentRestaurant} decrementRestaurant={this.decrementRestaurant}
        incrementRestaurant={this.incrementRestaurant} restaurant={restaurants[currentRestaurant]}/> */}
    </div >
    );
  }
}
