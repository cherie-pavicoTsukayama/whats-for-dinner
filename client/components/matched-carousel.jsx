import React from 'react';

export default class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImageIndex: 0,
      autoStartId: null
    };
    this.loopThroughImages = this.loopThroughImages.bind(this);
    this.startCarousel = this.startCarousel.bind(this);
  }

  startCarousel() {
    const intervalId = setInterval(this.loopThroughImages, 3000);
    this.setState({
      autoStartId: intervalId
    });
  }

  loopThroughImages() {
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

  componentDidMount() {
    this.startCarousel();
  }

  componentWillUnmount() {
    clearInterval(this.state.autoStartId);
  }

  render() {
    return (
      <div className={'d-felx flex-wrap justify-content-center'}>
        <div className={'d-flex flex-nowrap justify-content-center'}>
          <figure className={'figure col-md-8 col-lg-9'}>
            <img src={this.props.images[this.state.currentImageIndex]}
              alt="" className={'figure-image'} />
          </figure>
        </div>
      </div>
    );
  }
}
