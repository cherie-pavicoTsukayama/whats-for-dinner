import React from 'react';

export default class RestaurantDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hours: []
    };
    this.renderStarRating = this.renderStarRating.bind(this);
    this.renderAddress = this.renderAddress.bind(this);
    this.renderIsOpen = this.renderIsOpen.bind(this);
    this.renderHours = this.renderHours.bind(this);
    this.convertDayOfTheWeek = this.convertDayOfTheWeek.bind(this);
    this.convertTime = this.convertTime.bind(this);
  }

  renderStarRating() {
    const rating = this.props.restaurants.rating;
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
    const address = this.props.restaurants.location.display_address;
    const displayAddress = address.map(line => {
      return <p key={line[0]} className="m-0 p-0 montserrat-500 address text-center">{line}</p>;
    });
    return displayAddress;
  }

  getRestaurantDetails(restaurantid) {
    const restaurantId = this.props.restaurants.id;
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

  renderIsOpen() {
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

  convertDayOfTheWeek(weekDay) {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    let day = null;
    if (weekDay.length !== 0) {
      day = weekDay.day;
    }
    return days[day];
  }

  convertTime(weekDay) {
    let start = '';
    let end = '';
    if (start <= 1200) {
      const minutes = weekDay.start.slice(2);
      const hours = weekDay.start.slice(0, 2);
      start = `${hours}:${minutes} am`;
    }
    const closingMinutes = weekDay.end.slice(2);
    const closingHours = weekDay.end.slice(0, 2) - 12;
    end = `${closingHours}:${closingMinutes} pm`;
    const hours = start + ' - ' + end;
    return hours;
  }

  renderHours(hours) {
    const renderHours = hours.map(weekDay => {
      return (
        <div key={weekDay.day} className=" col-12 w-80 d-felx row justify-content-center">
          <div className="col-3 ml-2">
            <p className="montserrat-700 m-0">{this.convertDayOfTheWeek(weekDay)}</p>
          </div>
          <div className="col ml-2">
            <p className="montserrat-500 m-0">{this.convertTime(weekDay)}</p>
          </div>
        </div>
      );
    });
    return renderHours;
  }

  componentDidMount() {
    this.getRestaurantDetails();
  }

  render() {
    return (

      <div>
        <div className="d-flex flex-wrap justify-content-center mt-4 container">
          <h1 className="montserrat-400 brand-blue text-center">{this.props.restaurants.name}</h1>
          <div className="col-12 d-flex justify-content-center mt-2">
            {this.renderStarRating()}
          </div>
          <div className="pt-4 pb-5">
            {this.renderAddress()}
          </div>
          <div className="col-12 d-flex justify-content-center pb-3">
            {this.renderIsOpen()}
          </div>
          <div className="col-12 w-100 d-flex flex-wrap justify-content-center">
            {this.renderHours(this.state.hours)}
          </div>

        </div>
      </div>
    );
  }
}
