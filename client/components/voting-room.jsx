import React from 'react';
import RestaurantDetails from './restaurant-details';
// import MatchConfirmed from './match-confirmed';

export default class VotingRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      view: 'voting room',
      match: true,
      currentImageIndex: 0,
      details: null,
      photos: []
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.handleClickNextImage = this.handleClickNextImage.bind(this);
    this.handleClickBackImage = this.handleClickBackImage.bind(this);
    this.renderStarRating = this.renderStarRating.bind(this);
    this.getDetails = this.getDetails.bind(this);
    this.renderPhoto = this.renderPhoto.bind(this);
    this.handleClickBackToVotingRoom = this.handleClickBackToVotingRoom.bind(this);
    this.handleClickInfo = this.handleClickInfo.bind(this);
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

  getDetails() {
    fetch(`/api/restaurants/${this.props.restaurant.id}`)
      .then(result => result.json())
      .then(data => {
        this.setState({
          details: data,
          photos: data.photos
        });
      })
      .catch(err => console.error(err));
  }

  showModal() {
    this.setState({ match: true });
  }

  hideModal() {
    this.setState({ match: false });
  }

  handleClickNextImage() {
    const currentImageIndex = this.state.currentImageIndex;
    let newImageIndex = null;
    if (currentImageIndex === this.state.photos.length - 1) {
      newImageIndex = 0;
    } else {
      newImageIndex = currentImageIndex + 1;
    }
    this.setState({
      currentImageIndex: newImageIndex
    });
  }

  handleClickBackImage() {
    const currentImageIndex = this.state.currentImageIndex;
    let newImageIndex = null;
    if (currentImageIndex === 0) {
      newImageIndex = this.props.images.length - 1;
    } else {
      newImageIndex = currentImageIndex - 1;
    }
    this.setState({
      currentImageIndex: newImageIndex
    });
  }

  renderPhoto() {
    if (this.state.photos.length !== 0) {
      return <img
        src={this.state.details.photos[this.state.currentImageIndex]}
        alt="Yelp Restaurant Business Image"
        className={' h-100 w-100 '} />;
    } else {
      return null;
    }
  }

  handleClickBackToVotingRoom() {
    this.setState({
      view: 'voting room'
    });
  }

  handleClickInfo() {
    this.setState({
      view: 'info'
    });
  }

  componentDidMount() {
    this.getDetails();
  }

  render() {
    if (this.state.view === 'voting room') {
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
              {this.renderPhoto()};
            </div>
            <div className={'match-button-container d-flex justify-content-between align-items-center h-100 w-100'}>
              <button className='btn'>
                <i className={'fas fa-chevron-left fa-4x food-choice-arrow'} onClick={this.handleClickBackImage}></i>
              </button>
              <button className={'btn'}>
                <i className={'fas fa-chevron-right fa-4x food-choice-arrow'} onClick={this.handleClickNextImage}></i>
              </button>
            </div>
          </div>
          <div className={'col-sm d-flex justify-content-center  pl-0 pr-0'}>
            <button
              type="button"
              className="btn btn-secondary grey-button m-3 shadow-sm"
              onClick={this.handleClickInfo}>
                Info
            </button>
          </div>
          <div className={'col d-flex justify-content-center brand-blue  pl-0 pr-0 restaurant-button-choice'}>
            <button className='btn '>
              <i className={'fas fa-caret-left white fa-5x'} onClick={() => { this.props.decrementRestaurant(); }} ></i>
            </button>
            <button className={'btn'}>
              <i className={'fas fa-caret-right white fa-5x'} onClick={() => { this.props.incrementRestaurant(); }}></i>
            </button>
          </div>
        </div>
      );
    } else if (this.state.view === 'info') {
      return (
        <RestaurantDetails restaurants={this.props.restaurant} onClick={this.handleClickBackToVotingRoom} />
      );
    }
  }
}
