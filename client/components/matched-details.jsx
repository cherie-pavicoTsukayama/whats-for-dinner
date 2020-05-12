import React from 'react';
import Carousel from './matched-carousel';
import LeaveRoom from './leave-room';

export default class MatchedDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hours: [],
      reviews: [],
      address: [],
      isLeaving: false,
      photos: []
    };
    this.renderStarRating = this.renderStarRating.bind(this);
    this.renderAddress = this.renderAddress.bind(this);
    this.renderIsOpen = this.renderIsOpen.bind(this);
    this.renderHours = this.renderHours.bind(this);
    this.convertDayOfTheWeek = this.convertDayOfTheWeek.bind(this);
    this.convertTime = this.convertTime.bind(this);
    this.renderReviews = this.renderReviews.bind(this);
    this.renderUserStarRating = this.renderUserStarRating.bind(this);
    this.convertDate = this.convertDate.bind(this);
    this.renderReviewText = this.renderReviewText.bind(this);
    this.renderImageCarousel = this.renderImageCarousel.bind(this);
    this.showLeaveRoom = this.showLeaveRoom.bind(this);
    this.hideLeaveRoom = this.hideLeaveRoom.bind(this);
    this.leaveRoom = this.leaveRoom.bind(this);
  }

  renderStarRating() {
    const rating = this.state.rating;
    switch (rating) {
      case 1:
        return <img className="img-fluid review-star-image pb-1" src="./images/1-stars.png" alt="" />;
      case 1.5:
        return <img className="img-fluid review-star-image pb-1" src="./images/1-and-a-half-stars.png" alt="" />;
      case 2:
        return <img className="img-fluid review-star-image pb-1" src="./images/2-stars.png" alt="" />;
      case 2.5:
        return <img className="img-fluid review-star-image pb-1" src="./images/2-and-a-half-stars.png" alt="" />;
      case 3:
        return <img className="img-fluid review-star-image pb-1" src="./images/3-stars.png" alt="" />;
      case 3.5:
        return <img className="img-fluid review-star-image pb-1" src="./images/3-and-a-half-stars.png" alt="" />;
      case 4:
        return <img className="img-fluid review-star-image pb-1" src="./images/4-stars.png" alt="" />;
      case 4.5 :
        return <img className="img-fluid review-star-image pb-1" src="./images/4-and-a-half-stars.png" alt=""/>;
      case 5 :
        return <img className="img-fluid review-star-image pb-1" src="./images/5-stars.png" alt="" />;
      default :
        break;
    }
  }

  renderUserStarRating(user) {
    const rating = user.rating;
    switch (rating) {
      case 1:
        return <img className="user-star-rating" src="./images/1-stars.png" alt="" />;
      case 1.5:
        return <img className="user-star-rating" src="./images/1-and-a-half-stars.png" alt="" />;
      case 2:
        return <img className="user-star-rating" src="./images/2-stars.png" alt="" />;
      case 2.5:
        return <img className="user-star-rating" src="./images/2-and-a-half-stars.png" alt="" />;
      case 3:
        return <img className="user-star-rating" src="./images/3-stars.png" alt="" />;
      case 3.5:
        return <img className="user-star-rating" src="./images/3-and-a-half-stars.png" alt="" />;
      case 4:
        return <img className="user-star-rating" src="./images/4-stars.png" alt="" />;
      case 4.5:
        return <img className="user-star-rating" src="./images/4-and-a-half-stars.png" alt="" />;
      case 5:
        return <img className="user-star-rating" src="./images/5-stars.png" alt="" />;
      default:
        break;
    }
  }

  renderAddress() {
    const address = this.state.address;
    let displayAddress = null;
    if (address.length !== 0) {
      displayAddress = address.map((line, index) => {
        return <p key={index} className="m-0 p-0 montserrat-500 address text-center">{line}</p>;
      });
    }
    return displayAddress;
  }

  showLeaveRoom() {
    this.setState({ isLeaving: true });
  }

  hideLeaveRoom() {
    this.setState({ isLeaving: false });
  }

  leaveRoom() {
    const options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' }
    };
    fetch('/api/leave', options)
      .then(result => result.json())
      .then(data => clearInterval(this.matchFetch))
      .then(this.props.setView('landing page'))
      .catch(err => console.error(err));
  }

  getRestaurantDetails() {
    const restaurantId = this.props.restaurantId;
    Promise.all([
      fetch(`/api/restaurants/${restaurantId}`)
        .then(res => res.json()),
      fetch(`/api/restaurants/${restaurantId}/reviews`)
        .then(res => res.json())
    ])
      .then(data => {
        this.setState({
          name: data[0].name,
          rating: data[0].rating,
          address: data[0].location.display_address,
          hours: data[0].hours[0].open,
          isOpen: data[0].hours[0].is_open_now,
          reviews: data[1].reviews,
          photos: data[0].photos,
          url: data[0].url
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

  renderImageCarousel(photos) {
    let carousel = null;
    if (photos.length !== 0) {
      carousel = <Carousel images={photos} />;
    }
    return carousel;
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
    if (parseInt(weekDay.start) < 1200) {
      const minutes = weekDay.start.slice(2);
      let hours = weekDay.start.slice(0, 2);
      if (hours[0] === '0') {
        hours = hours[1];
      }
      start = `${hours}:${minutes} am`;
    } else if (parseInt(weekDay.start) === 1200) {
      const minutes = weekDay.start.slice(2);
      let hours = weekDay.start.slice(0, 2);
      if (hours[0] === '0') {
        hours = hours[1];
      }
      start = `${hours}:${minutes} pm`;
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
        <div key={weekDay.day} className=" col-12 w-80 d-flex justify-content-center">
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

  convertDate(review) {
    const date = review.time_created.slice(0, 10).split('-');
    const [year, month, day] = date;
    const convertedDate = `${month}/${day}/${year}`;
    return (
      <p className="mb-2 mt-2 montserrat-100 review-date">{convertedDate}</p>
    );
  }

  renderReviewText(review) {
    const reviewTextHadTrailingDots = review.text.slice(0, -3);
    const reviewTextHadNoTrailingDots = review.text;
    let reviewText = null;
    if (review.text.slice(-3) === '...') {
      reviewText = reviewTextHadTrailingDots;
    } else {
      reviewText = reviewTextHadNoTrailingDots;
    }
    return (
      <p>{reviewText + '...'}<a href={review.url} target="blank">read more</a></p>
    );
  }

  renderReviews(reviews) {
    let renderReviews = null;
    if (reviews.length !== 0) {
      renderReviews = reviews.map(review => {
        return (
          <div key={review.id} className="mb-5 container">
            <div className="row align-items-center">
              <img className="user-image mr-2" src={review.user.image_url} alt="" />
              <div className="mt-2">
                <p className="user-name mb-0 p-0 montserrat-400">{review.user.name}
                </p>
                {this.renderUserStarRating(review)}
              </div>
            </div>
            <div className="row">
              {this.convertDate(review)}
              {this.renderReviewText(review)}
            </div>
          </div>

        );
      });
    }
    return renderReviews;
  }

  componentDidMount() {
    this.getRestaurantDetails();
  }

  compoenentDidUpdate() {
    this.getRestaurantDetails();
  }

  render() {
    let restaurantDetails = null;
    if (this.state.photos.length !== 0) {
      restaurantDetails =
      (<div className="d-flex flex-wrap justify-content-center mt-4">
        <h1 className="montserrat-400 brand-blue-text text-center match-line-height">{this.state.name}</h1>
        <div className="col-12 d-flex justify-content-center mt-2">
          {this.renderStarRating()}
        </div>
        <div className="pt-4 pb-4">
          {this.renderAddress()}
        </div>
        <div className="d-flex flex-wrap justify-content-center mb-5">
          {this.renderImageCarousel(this.state.photos)}
          <form action={this.state.url} target="_blank">
            <button type="submit" className="btn pointer match-website-button shadow-sm">View on Yelp</button>
          </form>

        </div>
        <div className="col-12 d-flex justify-content-center pb-3">
          {this.renderIsOpen()}
        </div>
        <div className="col-12 d-flex flex-wrap justify-content-center pb-5">
          {this.renderHours(this.state.hours)}
        </div>
        <div className="mt-3 mb-5 ml-3 mr-3">
          {this.renderReviews(this.state.reviews)}
        </div>
      </div>);
    } else {
      restaurantDetails =
        (<div className="d-flex h-100 justify-content-center container align-content-center">
          <img src="./images/loading.gif" alt="" className="align-self-center" />
        </div>
        );
    }

    return (
      <div>
        <div className="container">
          <LeaveRoom isLeaving={this.state.isLeaving} hide={this.hideLeaveRoom} leave={this.leaveRoom} />
          <div className="col-12 pl-0 mt-3">
            <button onClick={this.showLeaveRoom} type="button" className="btn btn-secondary leave-room-button shadow view-height-four">Leave Room</button>
          </div>
          <div className="col match-logo"></div>
        </div>
        {restaurantDetails}
      </div>
    );
  }
}
