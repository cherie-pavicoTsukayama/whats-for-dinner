import React from 'react';
import VotingRoom from './voting-room';
import CreateRoomForm from './create-room-form';
import LandingPage from './landing-page';
import HostJoinRoom from './host-join-room';
import UserJoinRoom from './user-join-room';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      view: 'landing page',
      currentRestaurant: 0,
      restaurants: null,
      matchedRestaurantId: 'DGy688y4F0WAj2-CpxRALw',
      errorMessage: ''
    };
    this.incrementRestaurant = this.incrementRestaurant.bind(this);
    this.decrementRestaurant = this.decrementRestaurant.bind(this);
    this.joinRoom = this.joinRoom.bind(this);
    this.setView = this.setView.bind(this);
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
    fetch(`/api/rooms/${entryKey}`)
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          this.setState({ errorMessage: 'Invalid Entry Key' });
        } else {
          this.setState({
            restaurants: data.restaurants,
            view: 'view restaurants',
            errorMessage: ''
          });
        }
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
        currentView = <UserJoinRoom
          joinRoom={this.joinRoom}
          errorMessage={this.state.errorMessage}/>;
    }
    const { message, isLoading, view, currentRestaurant, restaurants } = this.state;
    return (
      isLoading
        ? <h1>Testing connections...</h1>
        : <h1>{message.toUpperCase()}</h1>,
      <div>
        {currentView}
      </div >

      // <div>
      //   //<CreateRoomForm joinRoom={this.joinRoom} setView={this.setView}/>
      //   <LandingPage />
      //   {/* <VotingRoom currentRestaurant={currentRestaurant} decrementRestaurant={this.decrementRestaurant}
      //     incrementRestaurant={this.incrementRestaurant} restaurant={restaurants[currentRestaurant]}/> */}
      // </div >
    );
  }
}
