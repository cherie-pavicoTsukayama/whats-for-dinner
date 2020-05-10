import React from 'react';
import VotingRoom from './voting-room';
import CreateRoomForm from './create-room-form';
import LandingPage from './landing-page';
import UserJoinRoom from './user-join-room';
import MatchDetails from './matched-details';
import LeaveRoom from './leave-room';

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
          review_count: 1093,
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
            'pickup',
            'delivery'
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
          review_count: 677,
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
          review_count: 575,
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
            'pickup',
            'delivery'
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
        },
        {
          id: 'S7XAbOskIE7TWKyGge4-VA',
          alias: 'burger-lounge-irvine',
          name: 'Burger Lounge',
          image_url: 'https://s3-media2.fl.yelpcdn.com/bphoto/eXpxiiU7I3C8mHQ_kOexJg/o.jpg',
          is_closed: false,
          url: 'https://www.yelp.com/biz/burger-lounge-irvine?adjust_creative=8x-8QWLAQlDHyDYSn04N4g&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=8x-8QWLAQlDHyDYSn04N4g',
          review_count: 460,
          categories: [
            {
              alias: 'burgers',
              title: 'Burgers'
            }
          ],
          rating: 4.0,
          coordinates: {
            latitude: 33.646226,
            longitude: -117.743422
          },
          transactions: [
            'pickup',
            'delivery'
          ],
          price: '$$',
          location: {
            address1: '8553 Irvine Center Dr',
            address2: '',
            address3: '',
            city: 'Irvine',
            zip_code: '92618',
            country: 'US',
            state: 'CA',
            display_address: [
              '8553 Irvine Center Dr',
              'Irvine, CA 92618'
            ]
          },
          phone: '+19494500440',
          display_phone: '(949) 450-0440',
          distance: 5857.342764085277
        },
        {
          id: 'aibYeP7eZKqvoL4ckM8GnA',
          alias: 'hole-in-the-wall-burger-lake-forest',
          name: 'Hole In the Wall Burger',
          image_url: 'https://s3-media3.fl.yelpcdn.com/bphoto/0CHQDyvjbZPMEobNfoS5kA/o.jpg',
          is_closed: false,
          url: 'https://www.yelp.com/biz/hole-in-the-wall-burger-lake-forest?adjust_creative=8x-8QWLAQlDHyDYSn04N4g&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=8x-8QWLAQlDHyDYSn04N4g',
          review_count: 306,
          categories: [
            {
              alias: 'burgers',
              title: 'Burgers'
            },
            {
              alias: 'tacos',
              title: 'Tacos'
            }
          ],
          rating: 4.5,
          coordinates: {
            latitude: 33.627701,
            longitude: -117.690158
          },
          transactions: [
            'pickup',
            'delivery'
          ],
          price: '$',
          location: {
            address1: '25262 Jeronimo Rd',
            address2: '',
            address3: '',
            city: 'Lake Forest',
            zip_code: '92630',
            country: 'US',
            state: 'CA',
            display_address: [
              '25262 Jeronimo Rd',
              'Lake Forest, CA 92630'
            ]
          },
          phone: '+19493289049',
          display_phone: '(949) 328-9049',
          distance: 11105.659713785071
        },
        {
          id: 'TEoLBfiX8eHf_dKDNndU6A',
          alias: 'the-habit-burger-grill-irvine-2',
          name: 'The Habit Burger Grill',
          image_url: 'https://s3-media3.fl.yelpcdn.com/bphoto/AFuf7emNB-b0RpllUvlrQA/o.jpg',
          is_closed: false,
          url: 'https://www.yelp.com/biz/the-habit-burger-grill-irvine-2?adjust_creative=8x-8QWLAQlDHyDYSn04N4g&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=8x-8QWLAQlDHyDYSn04N4g',
          review_count: 461,
          categories: [
            {
              alias: 'burgers',
              title: 'Burgers'
            },
            {
              alias: 'salad',
              title: 'Salad'
            },
            {
              alias: 'sandwiches',
              title: 'Sandwiches'
            }
          ],
          rating: 4.0,
          coordinates: {
            latitude: 33.70473,
            longitude: -117.787
          },
          transactions: [],
          price: '$',
          location: {
            address1: '14474 Culver Dr.',
            address2: '#A',
            address3: '',
            city: 'Irvine',
            zip_code: '92604',
            country: 'US',
            state: 'CA',
            display_address: [
              '14474 Culver Dr.',
              '#A',
              'Irvine, CA 92604'
            ]
          },
          phone: '+19495525963',
          display_phone: '(949) 552-5963',
          distance: 2963.9596335480564
        },
        {
          id: 'Jcpo0wZfey_YaNzhk8vmGQ',
          alias: 'the-counter-custom-burgers-irvine',
          name: 'The Counter Custom Burgers',
          image_url: 'https://s3-media4.fl.yelpcdn.com/bphoto/pxG_58xnxmPP2Xf2lY79Qg/o.jpg',
          is_closed: false,
          url: 'https://www.yelp.com/biz/the-counter-custom-burgers-irvine?adjust_creative=8x-8QWLAQlDHyDYSn04N4g&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=8x-8QWLAQlDHyDYSn04N4g',
          review_count: 1337,
          categories: [
            {
              alias: 'burgers',
              title: 'Burgers'
            }
          ],
          rating: 3.5,
          coordinates: {
            latitude: 33.6981321871319,
            longitude: -117.741269767284
          },
          transactions: [
            'pickup',
            'delivery'
          ],
          price: '$$',
          location: {
            address1: '6416 Irvine Blvd',
            address2: '',
            address3: 'Woodbury Town Center',
            city: 'Irvine',
            zip_code: '92620',
            country: 'US',
            state: 'CA',
            display_address: [
              '6416 Irvine Blvd',
              'Woodbury Town Center',
              'Irvine, CA 92620'
            ]
          },
          phone: '+19493367272',
          display_phone: '(949) 336-7272',
          distance: 5285.543861352225
        },
        {
          id: 'dBSlJx9gNtomml0ozHNKyQ',
          alias: 'peters-gourmade-grill-tustin',
          name: "Peter's Gourmade Grill",
          image_url: 'https://s3-media4.fl.yelpcdn.com/bphoto/eFalhbo_CUKdsPvG7o51kg/o.jpg',
          is_closed: false,
          url: 'https://www.yelp.com/biz/peters-gourmade-grill-tustin?adjust_creative=8x-8QWLAQlDHyDYSn04N4g&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=8x-8QWLAQlDHyDYSn04N4g',
          review_count: 2490,
          categories: [
            {
              alias: 'burgers',
              title: 'Burgers'
            },
            {
              alias: 'sandwiches',
              title: 'Sandwiches'
            }
          ],
          rating: 4.5,
          coordinates: {
            latitude: 33.7340036940625,
            longitude: -117.82657936957
          },
          transactions: [
            'delivery'
          ],
          price: '$',
          location: {
            address1: '14311 Newport Ave',
            address2: 'Ste A',
            address3: '',
            city: 'Tustin',
            zip_code: '92780',
            country: 'US',
            state: 'CA',
            display_address: [
              '14311 Newport Ave',
              'Ste A',
              'Tustin, CA 92780'
            ]
          },
          phone: '+17148322099',
          display_phone: '(714) 832-2099',
          distance: 6885.1297959654285
        },
        {
          id: 'MNvBM6N8zeldlSRUuP4nKw',
          alias: 'hammer-burger-orange-county',
          name: 'Hammer Burger',
          image_url: 'https://s3-media4.fl.yelpcdn.com/bphoto/eGBtXRNaQDF6OBfnS2Gn1w/o.jpg',
          is_closed: false,
          url: 'https://www.yelp.com/biz/hammer-burger-orange-county?adjust_creative=8x-8QWLAQlDHyDYSn04N4g&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=8x-8QWLAQlDHyDYSn04N4g',
          review_count: 7,
          categories: [
            {
              alias: 'foodstands',
              title: 'Food Stands'
            },
            {
              alias: 'burgers',
              title: 'Burgers'
            }
          ],
          rating: 5.0,
          coordinates: {
            latitude: 33.7887344360352,
            longitude: -117.869499206543
          },
          transactions: [],
          location: {
            address1: null,
            address2: null,
            address3: '',
            city: 'Orange County',
            zip_code: '92868',
            country: 'US',
            state: 'CA',
            display_address: [
              'Orange County, CA 92868'
            ]
          },
          phone: '',
          display_phone: '',
          distance: 14189.570263283262
        },
        {
          id: 'LOgOKPQce_wzT6nc0ZPpMQ',
          alias: 'hopdoddy-burger-bar-tustin',
          name: 'Hopdoddy Burger Bar',
          image_url: 'https://s3-media3.fl.yelpcdn.com/bphoto/SO33fySCOjrm82YVBMRU5g/o.jpg',
          is_closed: false,
          url: 'https://www.yelp.com/biz/hopdoddy-burger-bar-tustin?adjust_creative=8x-8QWLAQlDHyDYSn04N4g&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=8x-8QWLAQlDHyDYSn04N4g',
          review_count: 784,
          categories: [
            {
              alias: 'burgers',
              title: 'Burgers'
            }
          ],
          rating: 4.0,
          coordinates: {
            latitude: 33.7223470012554,
            longitude: -117.793670656187
          },
          transactions: [
            'delivery'
          ],
          price: '$$',
          location: {
            address1: '3030 El Camino Real',
            address2: null,
            address3: '',
            city: 'Tustin',
            zip_code: '92782',
            country: 'US',
            state: 'CA',
            display_address: [
              '3030 El Camino Real',
              'Tustin, CA 92782'
            ]
          },
          phone: '+17145052337',
          display_phone: '(714) 505-2337',
          distance: 4864.848446728596
        }
      ],
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
