import React from 'react';
import MatchedDetails from './matched-details';
// import VotingRoom from './voting-room';
// import LandingPage from './landing-page';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      view: 'landingPage',
      currentRestaurant: 6,
      restaurants: null,
      matchedRestaurantId: 'DGy688y4F0WAj2-CpxRALw'
    };

    this.joinRoom = this.joinRoom.bind(this);
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
    // eslint-disable-next-line no-unused-vars
    const { isLoading, message, restaurants, currentRestaurant } = this.state;
    return (isLoading
      ? <h1>Testing connections...</h1>
      : <h1>{message.toUpperCase()}</h1>,
    <div>
      <MatchedDetails restaurantId={this.state.matchedRestaurantId}/>
      {/* <LandingPage /> */}
    </div >
    );
  }
}
