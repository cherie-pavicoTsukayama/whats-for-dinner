import React from 'react';
import VotingRoom from './voting-room';
import CreateRoomForm from './create-room-form';
import LandingPage from './landing-page';
import UserJoinRoom from './user-join-room';
import MatchDetails from './matched-details';
// import LeaveRoom from './leave-room';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      view: 'voting room',
      currentRestaurant: 0,
      restaurants: [
        {
          id: 'NVB2X8t5Rie8S5AnzOnWJg',
          alias: 'north-italia-irvine',
          name: 'North Italia',
          image_url: 'https://s3-media2.fl.yelpcdn.com/bphoto/TWL29M9UmLCIE1BZrXni8A/o.jpg',
          is_closed: false,
          url: 'https://www.yelp.com/biz/north-italia-irvine?adjust_creative=8x-8QWLAQlDHyDYSn04N4g&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=8x-8QWLAQlDHyDYSn04N4g',
          review_count: 3184,
          categories: [
            {
              alias: 'pizza',
              title: 'Pizza'
            },
            {
              alias: 'italian',
              title: 'Italian'
            }
          ],
          rating: 4.5,
          coordinates: {
            latitude: 33.67179,
            longitude: -117.84507
          },
          transactions: [
            'delivery'
          ],
          price: '$$',
          location: {
            address1: '2957 Michelson Dr',
            address2: '',
            address3: '',
            city: 'Irvine',
            zip_code: '92612',
            country: 'US',
            state: 'CA',
            display_address: [
              '2957 Michelson Dr',
              'Irvine, CA 92612'
            ]
          },
          phone: '+19496297060',
          display_phone: '(949) 629-7060',
          distance: 4841.642780366079
        },
        {
          id: 'O8-e3IkpbSYjwHyPKEiaGg',
          alias: 'cucina-enoteca-irvine-irvine-2',
          name: 'CUCINA enoteca Irvine',
          image_url: 'https://s3-media3.fl.yelpcdn.com/bphoto/3mHb8SsDc6m3JcdHFeBpHg/o.jpg',
          is_closed: false,
          url: 'https://www.yelp.com/biz/cucina-enoteca-irvine-irvine-2?adjust_creative=8x-8QWLAQlDHyDYSn04N4g&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=8x-8QWLAQlDHyDYSn04N4g',
          review_count: 2202,
          categories: [
            {
              alias: 'italian',
              title: 'Italian'
            },
            {
              alias: 'pizza',
              title: 'Pizza'
            },
            {
              alias: 'wine_bars',
              title: 'Wine Bars'
            }
          ],
          rating: 4,
          coordinates: {
            latitude: 33.6517596900836,
            longitude: -117.746377664192
          },
          transactions: [
            'delivery'
          ],
          price: '$$',
          location: {
            address1: '532 Spectrum Center Dr',
            address2: '',
            address3: '',
            city: 'Irvine',
            zip_code: '92618',
            country: 'US',
            state: 'CA',
            display_address: [
              '532 Spectrum Center Dr',
              'Irvine, CA 92618'
            ]
          },
          phone: '+19498612222',
          display_phone: '(949) 861-2222',
          distance: 5272.855898309878
        },
        {
          id: 'L1frcqWd0Voe-5WN5SYx5Q',
          alias: 'mod-pizza-irvine-2',
          name: 'MOD Pizza',
          image_url: 'https://s3-media1.fl.yelpcdn.com/bphoto/S7FCA2wKpcrIkrwGBMQjqQ/o.jpg',
          is_closed: false,
          url: 'https://www.yelp.com/biz/mod-pizza-irvine-2?adjust_creative=8x-8QWLAQlDHyDYSn04N4g&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=8x-8QWLAQlDHyDYSn04N4g',
          review_count: 847,
          categories: [
            {
              alias: 'pizza',
              title: 'Pizza'
            },
            {
              alias: 'hotdogs',
              title: 'Fast Food'
            }
          ],
          rating: 4,
          coordinates: {
            latitude: 33.682443,
            longitude: -117.813366
          },
          transactions: [],
          price: '$',
          location: {
            address1: '3965 Alton Pkwy',
            address2: '',
            address3: '',
            city: 'Irvine',
            zip_code: '92604',
            country: 'US',
            state: 'CA',
            display_address: [
              '3965 Alton Pkwy',
              'Irvine, CA 92604'
            ]
          },
          phone: '+19492657770',
          display_phone: '(949) 265-7770',
          distance: 1897.1649707589625
        }],
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
            restaurants: data.restaurants.businesses,
            view: 'voting room',
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
    const { message, isLoading, view, currentRestaurant, restaurants } = this.state;
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
          setView={this.setView}/>;
        break;
      case 'voting room':
        if (this.state.restaurants.length !== 0) {
          currentView = <VotingRoom currentRestaurant={currentRestaurant}
            decrementRestaurant={this.decrementRestaurant}
            incrementRestaurant={this.incrementRestaurant}
            restaurant={restaurants[currentRestaurant]}
            setView={this.setView}
          />;
        }
        break;
      case 'match details':
        currentView = <MatchDetails restaurantId={this.state.matchedRestaurantId} />;
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
