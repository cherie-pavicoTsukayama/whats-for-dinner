import React from 'react';

export default class RestaurantDetail extends React.Component {
  constructor(props) {
    super(props);
    this.starRating = this.starRating.bind(this);
  }

  starRating() {
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

  render() {
    return (

      <div>
        <div className="d-flex flex-wrap justify-content-center mt-4">
          <h1 className="  montserrat-400 brand-main-color">{this.props.restaurants[0].name}</h1>
          <div className="col-12 d-flex justify-content-center mt-2">
            {this.starRating()}
          </div>
          <p></p>
        </div>
      </div>
    );
  }
}
