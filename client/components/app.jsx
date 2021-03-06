import React from 'react';
import VotingRoom from './voting-room';
import CreateRoomForm from './create-room-form';
import LandingPage from './landing-page';
import UserJoinRoom from './user-join-room';
import MatchDetails from './matched-details';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      view: 'landing page',
      currentRestaurant: 0,
      restaurants: [],
      matchedRestaurantId: null,
      isThereAmatch: false,
      checkMatchIntervalId: null
    };
    this.checkMatch = this.checkMatch.bind(this);
    this.incrementRestaurant = this.incrementRestaurant.bind(this);
    this.decrementRestaurant = this.decrementRestaurant.bind(this);
    this.joinRoom = this.joinRoom.bind(this);
    this.setView = this.setView.bind(this);
    this.resetMatchState = this.resetMatchState.bind(this);
  }

  setView(screen) {
    this.setState({
      view: screen
    });
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
    return fetch(`/api/rooms/${entryKey}`)
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          return { errorMessage: 'Invalid Entry Key' };
        } else if (!data.isActive) {
          return { errorMessage: 'The room has been closed' };
        } else {
          this.setState({
            restaurants: data.restaurants.businesses
          });
          return { errorMessage: '' };
        }
      });
  }

  checkMatch() {
    const intervalId = setInterval(() => {
      fetch('/api/likedRestaurants')
        .then(result => result.json())
        .then(data => {
          if (data.match) {
            this.setState({
              matchedRestaurantId: data.match,
              isThereAmatch: true
            });
            clearInterval(this.state.checkMatchIntervalId);
          }
        })
        .catch(err => console.error(err));
    }, 3000);

    this.setState({ checkMatchIntervalId: intervalId });
  }

  componentDidMount() {
    fetch('/api/health-check')
      .then(res => res.json())
      .then(data => this.setState({ message: data.message || data.error }))
      .catch(err => this.setState({ message: err.message }))
      .finally(() => this.setState({ isLoading: false }));
  }

  resetMatchState() {
    this.setState({
      matchedRestaurantId: null,
      isThereAmatch: false
    });
  }

  render() {
    const {
      message,
      isLoading,
      view,
      currentRestaurant,
      checkMatchIntervalId,
      restaurants
    } = this.state;
    let currentView;
    switch (view) {
      case 'landing page':
        currentView = <LandingPage setViewState={this.setView} />;
        break;
      case 'create room':
        currentView = <CreateRoomForm joinRoom={this.joinRoom} setView={this.setView} />;
        break;
      case 'join room':
        currentView = <UserJoinRoom
          joinRoom={this.joinRoom}
          errorMessage={this.state.errorMessage}
          setView={this.setView}
          isActive={this.state.isActive}/>;
        break;
      case 'voting room':
        if (this.state.restaurants.length !== 0) {
          currentView = <VotingRoom currentRestaurant={currentRestaurant}
            decrementRestaurant={this.decrementRestaurant}
            incrementRestaurant={this.incrementRestaurant}
            restaurant={restaurants[currentRestaurant]}
            setView={this.setView}
            checkMatch={this.checkMatch}
            checkMatchIntervalId={checkMatchIntervalId}
            isThereAmatch={this.state.isThereAmatch}
          />;
        }
        break;
      case 'match details':
        currentView = <MatchDetails reset={this.resetMatchState} setView={this.setView} restaurantId={this.state.matchedRestaurantId} />;
        break;
    }

    return (
      isLoading
        ? <h1>Testing connections...</h1>
        : <h1>{message.toUpperCase()}</h1>,
      <div>
        {currentView}
      </div>
    );
  }
}
