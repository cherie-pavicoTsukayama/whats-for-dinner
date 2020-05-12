import React from 'react';
import RestaurantDetails from './restaurant-details';
import MatchConfirmed from './match-confirmed';
import LeaveRoom from './leave-room';
import RoomClosedModal from './room-closed-modal';

export default class VotingRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      view: 'voting room',
      match: false,
      currentImageIndex: 0,
      isLiked: null,
      images: [],
      isLeaving: false,
      restaurantId: null,
      isRoomClosedIntervalId: null,
      isRoomClosed: null
    };
    this.isRoomClosedIntervalId = null;
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.handleClickNextImage = this.handleClickNextImage.bind(this);
    this.handleClickBackImage = this.handleClickBackImage.bind(this);
    this.renderStarRating = this.renderStarRating.bind(this);
    this.getRestaurantDetails = this.getRestaurantDetails.bind(this);
    this.getCurrentImages = this.getCurrentImages.bind(this);
    this.handleClickBackToVotingRoom = this.handleClickBackToVotingRoom.bind(this);
    this.handleClickInfo = this.handleClickInfo.bind(this);
    this.checkIsLiked = this.checkIsLiked.bind(this);
    this.handleHeartClick = this.handleHeartClick.bind(this);
    this.showLeaveRoom = this.showLeaveRoom.bind(this);
    this.hideLeaveRoom = this.hideLeaveRoom.bind(this);
    this.leaveRoom = this.leaveRoom.bind(this);
    this.checkIfRoomIsClosed = this.checkIfRoomIsClosed.bind(this);
    this.hideRoomClosedModal = this.hideRoomClosedModal.bind(this);
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
      .then(data => this.setState({ images: data.photos || this.props.restaurant.image_url }))
      .catch(err => console.error(err));
  }

  checkIfRoomIsClosed() {
    this.isRoomClosedIntervalId = setInterval(() => {
      fetch('/api/isActive')
        .then(result => result.json())
        .then(data => {
          if (!data.isActive) {
            this.setState({ isRoomClosed: data.isActive });
            clearInterval(this.props.checkMatchIntervalId);
            clearInterval(this.isRoomClosedIntervalId);
            const options = {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' }
            };
            fetch('/api/leave', options)
              .catch(err => console.error(err));
          }
        })
        .catch(err => console.error(err));
    }, 3000);
  }

  checkIsLiked() {
    fetch(`/api/liked-restaurants/${this.props.restaurant.id}`)
      .then(response => response.json())
      .then(data => {
        if (!data.liked) {
          this.setState({ isLiked: false });
        } else {
          this.setState({ isLiked: true });
        }
      })
      .catch(err => console.error(err));
  }

  showModal() {
    this.setState({ match: true });
  }

  hideModal() {
    this.props.setView('match details');
    this.setState({ match: false });
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

  hideRoomClosedModal() {
    this.props.setView('landing page');
    this.setState({ isRooomClosed: null });
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
    if (this.state.images.length === 0) {
      return (
        <div className="col d-flex flex-wrap justify-content-center">
          <img src="./images/loading.gif" alt="" />
        </div>
      );
    } else if (this.state.images.length === 1 || typeof this.state.images === 'string') {
      return (
        <div className={'col d-flex flex-wrap justify-content-center  pl-0 pr-0 match-image-container'}>
          <div className={'col pl-0 pr-0 view-height-forty-five'}>
            <div className={'col pl-0 pr-0 view-height-forty-five'}>
              <img src={this.state.images}
                alt="Yelp Restaurant Business Image"
                className={' h-100 w-100 view-restaurant-image'} />
            </div>
          </div>
        </div>
      );
    } else if (typeof this.state.images !== 'string') {
      return (
        <div className={'col d-flex flex-wrap justify-content-center  pl-0 pr-0 match-image-container'}>
          <div className={'col pl-0 pr-0 view-height-forty-five'}>
            <div className={'col pl-0 pr-0 view-height-forty-five'}>
              <img src={this.state.images[this.state.currentImageIndex]}
                alt="Yelp Restaurant Business Image"
                className={' h-100 w-100 view-restaurant-image'} />
            </div>
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
      );
    }
  }

  handleHeartClick() {
    if (!this.state.isLiked) {
      const request = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ restaurantId: this.props.restaurant.id })
      };
      fetch('/api/liked-restaurants', request)
        .then(response => {
          if (response.ok) {
            this.setState({ isLiked: true });
          }
        })
        .catch(err => console.error(err));
    } else {
      fetch(`/api/liked-restaurants/${this.props.restaurant.id}`, { method: 'DELETE' })
        .then(response => {
          if (response.ok) {
            this.setState({ isLiked: false });
          }
        })
        .catch(err => console.error(err));
    }
  }

  componentDidMount() {
    this.getRestaurantDetails();
    this.checkIsLiked();
    this.props.checkMatch();
    this.checkIfRoomIsClosed();
  }

  componentDidUpdate(prevProps) {
    if (this.props.restaurant !== prevProps.restaurant) {
      this.getRestaurantDetails();
    }
    if (this.props.restaurant.id !== prevProps.restaurant.id) {
      this.checkIsLiked();
    }
  }

  componentWillUnmount() {
    clearInterval(this.props.checkMatchIntervalId);
    clearInterval(this.isRoomClosedIntervalId);
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

  render() {
    let heartColor;
    if (!this.state.isLiked) {
      heartColor = 'white';
    } else {
      heartColor = 'red';
    }

    if (this.state.view === 'voting room') {
      return (
        <div className={'container-fluid d-flex flex-column justify-content-between restaurant-room min-vh-100 min-vw-100  pl-0 pr-0'}>
          <RoomClosedModal isRoomClosed={this.state.isRoomClosed} setView={this.props.setView} hideRoomClosedModal={this.hideRoomClosedModal} />
          <MatchConfirmed match={this.props.isThereAmatch} setView={this.props.setView} hide={this.hideModal}/>
          <LeaveRoom isLeaving={this.state.isLeaving} hide={this.hideLeaveRoom} leave={this.leaveRoom} />
          <div className={'col-sm pl-3 pr-0'}>
            <img src="./images/leaveRoom.png" onClick={this.showLeaveRoom} className="door-icon mt-2" alt="Leave room"/>
          </div>
          <div className={'col d-flex justify-content-center align-items-center flex-column pl-0 pr-0 view-restaurant-header'}>
            <div className={'restaurant-title'}>{this.props.restaurant.name}</div>
            <div>
              {this.renderStarRating()}
            </div>
          </div>
          <div className={'col d-flex flex-wrap justify-content-center  px-0 match-image-container'}>
            <div className={'col pl-0 pr-0 view-height-forty-five'}>
              {this.getCurrentImages()}
            </div>
          </div>
          <div className={'col-sm d-flex justify-content-center  pl-0 pr-0 view-restaurant-button-container'}>
            <button
              type="button"
              className="btn btn-secondary grey-button m-3 shadow"
              onClick={this.handleClickInfo}>
                Info
            </button>
          </div>
          <div className={'col d-flex justify-content-around brand-blue pl-0 pr-0 restaurant-button-choice'}>
            <button className='btn '>
              <i className={'fas fa-caret-left white fa-3x'} onClick={ this.props.decrementRestaurant } ></i>
            </button>
            <button className="btn">
              <i
                className={`fas fa-heart fa-3x ${heartColor}`}
                onClick={() => this.handleHeartClick()}
              >
              </i>
            </button>
            <button className={'btn'}>
              <i className={'fas fa-caret-right white fa-3x'} onClick={ this.props.incrementRestaurant }> </i>
            </button>
          </div>
        </div>
      );
    } else if (this.state.view === 'info') {
      return (
        <div>
          <RoomClosedModal isRoomClosed={this.state.isRoomClosed} setView={this.props.setView} hideRoomClosedModal={this.hideRoomClosedModal} />
          <MatchConfirmed match={this.props.isThereAmatch} setView={this.props.setView} hide={this.hideModal} />
          <RestaurantDetails setView={this.props.setView} isLiked={this.state.isLiked} handleHeartClick={this.handleHeartClick} checkIsLiked={this.checkIsLiked} restaurants={this.props.restaurant} onClick={this.handleClickBackToVotingRoom} />
        </div>
      );
    }
  }
}
