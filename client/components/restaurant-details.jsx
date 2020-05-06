import React from 'react';

export default function RestaurantDetail(props) {

  return (
    <div>
      <div className="d-flex flex-wrap justify-content-center mt-4">
        <h1 className="  montserrat-400 brand-main-color ">{props.restaurants[0].name}</h1>
        <div></div>
      </div>
    </div>
  );
}
