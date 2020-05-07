import React from 'react';

export default class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImageIndex: 0,
      autoStartId: null
    };
    // this.loopThroughImages = this.loopThroughImages.bind(this);
    this.handleClickNext = this.handleClickNext.bind(this);
    this.handleClickDot = this.handleClickDot.bind(this);
    this.handleClickBack = this.handleClickBack.bind(this);
  }

  ThroughImages() {
    const currentImageIndex = this.state.currentImageIndex;
    const newImageIndex = currentImageIndex + 1;
    if ((this.props.images.length - 1) === currentImageIndex) {
      this.setState({
        currentImageIndex: 0
      });
    } else {
      this.setState({
        currentImageIndex: newImageIndex
      });
    }
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

  handleClickDot(event) {
    const newImageIndex = event.target.id;
    this.setState({
      currentImageIndex: parseInt(newImageIndex)
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

  componentDidMount() {
  }

  render() {
    return (
      <div className={'d-flex flex-column align-content-between restaurant-room'}>
        <div className={'row h-10'}>
          <div className={'col mb-1'}>
            <button type="button" className="btn btn-secondary leave-room-button">View Matches</button>
          </div>
        </div>

        <div className={'row h-20'}>
          <div className={'col d-flex justify-content-center align-items-center flex-column'}>
            <div>Restaurant Name</div>
            <div><img src={'https://images.nymag.com/news/intelligencer/intelposts120326_starstruck_560.jpg'} className={'img-fluid star-image'} alt=""/> </div>
          </div>
        </div>

        <div className={'row d-flex flex-wrap justify-content-center h-50'}>
          <button className='btn'>
            <i className={'fas fa-chevron-left'} onClick={this.handleClickBack}></i>
          </button>
          <div className={'col'}>
            <img src={this.props.images[this.state.currentImageIndex]} alt="" className={' h-100 w-100'} />
          </div>
          <button className={'btn'}>
            <i className={'fas fa-chevron-right'} onClick={this.handleClickNext}></i>
          </button>
        </div>

        <div className={'row h-10'}>
          <div className={'col d-flex justify-content-center'}>
            <button type="button" className="btn btn-secondary grey-button m-3 shadow">Info</button>
          </div>
        </div>

        <div className={'row brand-blue h-10'}>
          <div className={'col d-flex justify-content-between'}>
            <button className='btn'>
              <i className={'fas fa-chevron-left white'} onClick={this.handleClickBack}></i>
            </button>
            <button className={'btn'}>
              <i className={'fas fa-chevron-right white'} onClick={this.handleClickNext}></i>
            </button>
          </div>
        </div>

      </div>
    );
  }
}
