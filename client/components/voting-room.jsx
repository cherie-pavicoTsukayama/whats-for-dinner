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
      currentImageIndex: 0
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.handleClickNext = this.handleClickNext.bind(this);
    this.handleClickBack = this.handleClickBack.bind(this);
  }

  showModal() {
    this.setState({ match: true });
  }

  hideModal() {
    this.setState({ match: false });
  }

  handleClickNext() {
    const currentImageIndex = this.state.currentImageIndex;
    let newImageIndex = null;
    if (currentImageIndex === this.props.images.length - 1) {
      newImageIndex = 0;
    } else {
      newImageIndex = currentImageIndex + 1;
    }
    this.setState({
      currentImageIndex: newImageIndex
    });
  }

  handleClickBack() {
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

  render() {
    return (
      <div className={'container-fluid d-flex flex-column restaurant-room min-vh-100 min-vw-100  pl-0 pr-0'}>
        <div className={'col-sm pl-2 pr-0 mt-3'}>
          <button type="button" className="btn btn-secondary leave-room-button shadow view-height-four">Leave Room</button>
        </div>

        <div className={'col d-flex justify-content-center align-items-center flex-column pl-0 pr-0 mb-4'}>
          <div className={' restaurant-title '}>Restaurant Name</div>
          <div className={'mt-2'}>
            <img src={'/images/1-start.png'} className={'img-fluid review-star-image pb-1'} alt="Yelp Star Review Rating" />
          </div>
        </div>

        <div className={'col d-flex flex-wrap justify-content-center  pl-0 pr-0 match-image-container'}>
          <div className={'col pl-0 pr-0 view-height-fifty'}>
            <img src={this.props.images[this.state.currentImageIndex]} alt="Yelp Restaurant Business Image" className={' h-100 w-100 '} />
          </div>
          <div className={'match-button-container d-flex justify-content-between align-items-center h-100 w-100'}>
            <button className='btn'>
              <i className={'fas fa-chevron-left fa-4x food-choice-arrow'} onClick={this.handleClickBack}></i>
            </button>
            <button className={'btn'}>
              <i className={'fas fa-chevron-right fa-4x food-choice-arrow'} onClick={this.handleClickNext}></i>
            </button>
          </div>
        </div>

        <div className={'col-sm d-flex justify-content-center  pl-0 pr-0'}>
          <button type="button" className="btn btn-secondary grey-button m-3 shadow-sm">Info</button>
        </div>

        <div className={'col d-flex justify-content-around brand-blue  pl-0 pr-0'}>
          <button className='btn'>
            <i className={'fas fa-caret-left white fa-5x'} onClick={this.handleClickBack}></i>
          </button>
          <button className={'btn'}>
            <i className={'fas fa-caret-right white fa-5x'} onClick={this.handleClickNext}></i>
          </button>
        </div>

      </div>
    );
  }
}
