import React from 'react';
// import MatchConfirmed from './match-confirmed';

export default class VotingRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      view: 'restaurantRoom',
      match: true,
      currentImageIndex: 0,
      images: []
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.handleClickNextImage = this.handleClickNextImage.bind(this);
    this.handleClickBackImage = this.handleClickBackImage.bind(this);
    this.renderStarRating = this.renderStarRating.bind(this);
    this.getRestaurantDetails = this.getRestaurantDetails.bind(this);
    this.getCurrentImages = this.getCurrentImages.bind(this);
  }

  renderStarRating() {
    const rating = this.props.restaurant.rating;
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
      case 4.5:
        return <img className="img-fluid review-star-image pb-1" src="./images/4-and-a-half-stars.png" alt="" />;
      case 5:
        return <img className="img-fluid review-star-image pb-1" src="./images/5-stars.png" alt="" />;
      default:
        break;
    }
  }

  getRestaurantDetails() {
    const restaurantId = this.props.restaurant.id;
    fetch(`/api/restaurants/${restaurantId}`)
      .then(result => result.json())
      .then(data => this.setState({ images: data.photos || [] }))
      .catch(err => console.error(err));
  }

  showModal() {
    this.setState({ match: true });
  }

  hideModal() {
    this.setState({ match: false });
  }

  handleClickNextImage() {
    this.setState({ currentImageIndex: this.state.currentImageIndex + 1 });
    if (this.state.currentImageIndex === this.state.images.length - 1) {
      this.setState({ currentImageIndex: 0 });
    }
  }

  handleClickBackImage() {
    this.setState({ currentImageIndex: this.state.currentImageIndex - 1 });
    if (this.state.currentImageIndex === 0) {
      this.setState({ currentImageIndex: this.state.images.length - 1 });
    }
  }

  getCurrentImages() {
    return <img src={this.state.images[this.state.currentImageIndex]} alt="Yelp Restaurant Business Image" className={' h-100 w-100 '} />;
  }

  componentDidMount() {
    this.getRestaurantDetails();
  }

  componentDidUpdate(prevProps) {
    if (this.props.restaurant !== prevProps.restaurant) {
      this.getRestaurantDetails();
    }
  }

  render() {

    return (
      <div className={'container-fluid d-flex flex-column restaurant-room min-vh-100 min-vw-100  pl-0 pr-0'}>
        <div className={'col-sm pl-2 pr-0 mt-3'}>
          <button type="button" className="btn btn-secondary leave-room-button shadow view-height-four">Leave Room</button>
        </div>
        <div className={'col d-flex justify-content-center align-items-center flex-column pl-0 pr-0 mb-2'}>
          <div className={'restaurant-title'}>{this.props.restaurant.name}</div>
          <div className={'mt-2'}>
            {this.renderStarRating()}
          </div>
        </div>
        <div className={'col d-flex flex-wrap justify-content-center  pl-0 pr-0 match-image-container'}>
          <div className={'col pl-0 pr-0 view-height-forty-five'}>
            {this.getCurrentImages()}
          </div>
          <div className={'match-button-container d-flex justify-content-between align-items-center h-100 w-100'}>
            <button className='btn'>
              <i className={'fas fa-chevron-left fa-4x food-choice-arrow'} onClick={ this.handleClickBackImage}></i>
            </button>
            <button className={'btn'}>
              <i className={'fas fa-chevron-right fa-4x food-choice-arrow'} onClick={ this.handleClickNextImage}></i>
            </button>
          </div>
        </div>
        <div className={'col-sm d-flex justify-content-center  pl-0 pr-0'}>
          <button type="button" className="btn btn-secondary grey-button m-3 shadow-sm">Info</button>
        </div>
        <div className={'col d-flex justify-content-center brand-blue  pl-0 pr-0 restaurant-button-choice'}>
          <button className='btn '>
            <i className={'fas fa-caret-left white fa-5x'} onClick={ this.props.decrementRestaurant } ></i>
          </button>
          <button className={'btn'}>
            <i className={'fas fa-caret-right white fa-5x'} onClick={ this.props.incrementRestaurant }> </i>
          </button>
        </div>
      </div>
    );
  }
}
