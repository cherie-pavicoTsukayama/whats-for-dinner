import React from 'react';
// import VotingRoom from './voting-room';
// import LandingPage from './landing-page';
import RestaurantDetails from './restaurant-details';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      entryKey: 'abc123',
      view: 'landingPage',
      currentRestaurant: 6,
      restaurants: null
    };

    this.joinRoom = this.joinRoom.bind(this);
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

  componentDidMount() {
    fetch('/api/health-check')
      .then(res => res.json())
      .then(data => this.setState({ message: data.message || data.error }))
      .catch(err => this.setState({ message: err.message }))
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {
    const { isLoading, message, restaurants, currentRestaurant } = this.state;
    return (isLoading
      ? <h1>Testing connections...</h1>
      : <h1>{message.toUpperCase()}</h1>,
    <div>
      <RestaurantDetails restaurants={restaurants[currentRestaurant]}/>
    </div >

    );
  }
}
