import React from 'react';

export default class RestaurantDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hours: null,
      isOpen: null
    };
    this.renderStarRating = this.renderStarRating.bind(this);
    this.renderAddress = this.renderAddress.bind(this);
    this.isOpen = this.isOpen.bind(this);
  }

  renderStarRating() {
    const rating = this.props.restaurants[0].rating;
    switch (rating) {
      case 1:
        return <img className="star-rating" src="./images/1-stars.png" alt="" />;
      case 1.5:
        return <img className="star-rating" src="./images/1-and-a-half-stars.png" alt="" />;
      case 2:
        return <img className="star-rating" src="./images/2-stars.png" alt="" />;
      case 2.5:
        return <img className="star-rating" src="./images/2-and-a-half-stars.png" alt="" />;
      case 3:
        return <img className="star-rating" src="./images/3-stars.png" alt="" />;
      case 3.5:
        return <img className="star-rating" src="./images/3-and-a-half-stars.png" alt="" />;
      case 4:
        return <img className="star-rating" src="./images/4-stars.png" alt="" />;
      case 4.5 :
        return <img className="star-rating" src="./images/4-and-a-half-stars.png" alt=""/>;
      case 5 :
        return <img className="star-rating" src="./images/5-stars.png" alt="" />;
      default :
        break;
    }
  }

  renderAddress() {
    const address = this.props.restaurants[0].location.display_address;
    const displayAddress = address.map(line => {
      return <p key={line[0]} className="m-0 p-0 montserrat-500 address">{line}</p>;
    });
    return displayAddress;
  }

  getRestaurantDetails(restaurantid) {
    const restaurantId = this.props.restaurants[0].id;
    Promise.all([
      fetch(`/api/restaurants/${restaurantId}`)
        .then(res => res.json()),
      fetch(`/api/restaurants/${restaurantId}/reviews`)
        .then(res => res.json())
    ])
      .then(data => {
        this.setState({
          hours: data[0].hours[0].open,
          isOpen: data[0].hours[0].is_open_now,
          reviews: data[1].reviews
        });
      })
      .catch(err => console.error(err));
  }

  isOpen() {
    if (this.state.isOpen) {
      return (
        <div className="open-closed-feature bg-orange p-1">
          <p className="text-center montserrat-400 lead m-0">Open Now</p>
        </div>
      );
    } else {
      return (
        <div className="open-closed-feature bg-green p-1">
          <p className="text-center montserrat-400 lead m-0">Closed Now</p>
        </div>
      );
    }

  }

  componentDidMount() {
    this.getRestaurantDetails();
  }

  render() {
    return (

      <div>
        <div className="d-flex flex-wrap justify-content-center mt-4">
          <h1 className="montserrat-400 brand-blue">{this.props.restaurants[0].name}</h1>
          <div className="col-12 d-flex justify-content-center mt-2">
            {this.renderStarRating()}
          </div>
          <div className="pt-4 pb-4">
            {this.renderAddress()}
          </div>
          <div className="col-12 d-flex justify-content-center pb-4">
            {this.isOpen()}
          </div>
        </div>
      </div>
    );
  }
}
