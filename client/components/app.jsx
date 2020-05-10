import React from 'react';
import VotingRoom from './voting-room';
import CreateRoomForm from './create-room-form';
import LandingPage from './landing-page';
// import HostJoinRoom from './host-join-room';
import UserJoinRoom from './user-join-room';

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
          id: 'DGy688y4F0WAj2-CpxRALw',
          alias: 'the-cut-irvine-10',
          name: 'The Cut',
          image_url: 'https://s3-media4.fl.yelpcdn.com/bphoto/fr8oljlk9o6Hy7mxf1-T3A/o.jpg',
          is_closed: false,
          url: 'https://www.yelp.com/biz/the-cut-irvine-10?adjust_creative=8x-8QWLAQlDHyDYSn04N4g&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=8x-8QWLAQlDHyDYSn04N4g',
          review_count: 1092,
          categories: [
            {
              alias: 'burgers',
              title: 'Burgers'
            },
            {
              alias: 'tradamerican',
              title: 'American (Traditional)'
            },
            {
              alias: 'breakfast_brunch',
              title: 'Breakfast & Brunch'
            }
          ],
          rating: 4.5,
          coordinates: {
            latitude: 33.683263,
            longitude: -117.813121
          },
          transactions: [
            'delivery',
            'pickup'
          ],
          price: '$$',
          location: {
            address1: '3831 Alton Pkwy',
            address2: '',
            address3: null,
            city: 'Irvine',
            zip_code: '92606',
            country: 'US',
            state: 'CA',
            display_address: [
              '3831 Alton Pkwy',
              'Irvine, CA 92606'
            ]
          },
          phone: '+19493333434',
          display_phone: '(949) 333-3434',
          distance: 1919.413076376543
        },
        {
          id: 'WqHPB51wrjn1exIs-s9UXw',
          alias: 'the-stand-irvine',
          name: 'The Stand',
          image_url: 'https://s3-media2.fl.yelpcdn.com/bphoto/tdr5SbaZpq35wmB09vXxPA/o.jpg',
          is_closed: false,
          url: 'https://www.yelp.com/biz/the-stand-irvine?adjust_creative=8x-8QWLAQlDHyDYSn04N4g&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=8x-8QWLAQlDHyDYSn04N4g',
          review_count: 676,
          categories: [
            {
              alias: 'newamerican',
              title: 'American (New)'
            },
            {
              alias: 'burgers',
              title: 'Burgers'
            },
            {
              alias: 'fooddeliveryservices',
              title: 'Food Delivery Services'
            }
          ],
          rating: 4.5,
          coordinates: {
            latitude: 33.6687986,
            longitude: -117.7867064
          },
          transactions: [
            'delivery'
          ],
          price: '$$',
          location: {
            address1: '5633 Alton Pkwy',
            address2: 'Bldg 200',
            address3: null,
            city: 'Irvine',
            zip_code: '92618',
            country: 'US',
            state: 'CA',
            display_address: [
              '5633 Alton Pkwy',
              'Bldg 200',
              'Irvine, CA 92618'
            ]
          },
          phone: '+19492629090',
          display_phone: '(949) 262-9090',
          distance: 1171.3715337783422
        },
        {
          id: 'rK-nnggAgK6T4Sea8pKTFg',
          alias: 'mooyah-burgers-fries-and-shakes-irvine-3',
          name: 'MOOYAH Burgers, Fries & Shakes',
          image_url: 'https://s3-media4.fl.yelpcdn.com/bphoto/kGYLjFbKgeHQEA6uoLQjKA/o.jpg',
          is_closed: false,
          url: 'https://www.yelp.com/biz/mooyah-burgers-fries-and-shakes-irvine-3?adjust_creative=8x-8QWLAQlDHyDYSn04N4g&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=8x-8QWLAQlDHyDYSn04N4g',
          review_count: 574,
          categories: [
            {
              alias: 'burgers',
              title: 'Burgers'
            },
            {
              alias: 'icecream',
              title: 'Ice Cream & Frozen Yogurt'
            },
            {
              alias: 'hotdog',
              title: 'Hot Dogs'
            }
          ],
          rating: 4.0,
          coordinates: {
            latitude: 33.671683,
            longitude: -117.789418
          },
          transactions: [
            'delivery',
            'pickup'
          ],
          price: '$',
          location: {
            address1: '5365 Alton Pkwy',
            address2: 'Ste A2',
            address3: 'Alton Square Shopping Center',
            city: 'Irvine',
            zip_code: '92604',
            country: 'US',
            state: 'CA',
            display_address: [
              '5365 Alton Pkwy',
              'Ste A2',
              'Alton Square Shopping Center',
              'Irvine, CA 92604'
            ]
          },
          phone: '+19493333758',
          display_phone: '(949) 333-3758',
          distance: 850.5758617696121
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
    // const { message, isLoading } = this.state;
    const { message, isLoading, currentRestaurant, restaurants } = this.state;
    let currentView;
    switch (this.state.view) {
      case 'landing page':
        currentView = <LandingPage setViewState={this.setView}/>;
        break;
      case 'create room':
        currentView = <CreateRoomForm joinRoom={this.joinRoom} setView={this.setView}/>;
        break;
      case 'join room':
        currentView = <UserJoinRoom
          joinRoom={this.joinRoom}
          errorMessage={this.state.errorMessage}/>;
        break;
      case 'voting room':
        currentView = <VotingRoom currentRestaurant={currentRestaurant}
          decrementRestaurant={this.decrementRestaurant}
          incrementRestaurant={this.incrementRestaurant}
          restaurant={restaurants[currentRestaurant]} />;
        break;
    }

    return (
      isLoading
        ? <h1>Testing connections...</h1>
        : <h1>{message.toUpperCase()}</h1>,
      <div>
        {currentView}
      </div >

      // <div>
      //   <LandingPage />
      //   {/* <VotingRoom currentRestaurant={currentRestaurant} decrementRestaurant={this.decrementRestaurant}
      //     incrementRestaurant={this.incrementRestaurant} restaurant={restaurants[currentRestaurant]}/> */}
      // </div >
    );
  }
}
