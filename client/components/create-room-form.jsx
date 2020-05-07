import React from 'react';

class CreateRoomForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      category: '',
      radius: 0,
      price: 1
    };
    this.handleLocation = this.handleLocation.bind(this);
    this.handleCategory = this.handleCategory.bind(this);
    this.handleRadius = this.handleRadius.bind(this);
    this.handlePrice = this.handlePrice.bind(this);
  }

  handleLocation(event) {
    this.setState({ location: event.target.value });
  }

  handleCategory(event) {
    this.setState({ category: event.target.value });
  }

  handleRadius(event) {
    this.setState({ radius: event.target.value });
  }

  handlePrice(event) {
    this.setState({ price: event.target.value });
  }

  render() {
    return (
      <div className='container'>
        <form onSubmit={() => { this.props.createRoom(this.state); event.preventDefault(); }}>
          <div className='form-group mt-2 mb-2'>
            <p>Name</p>
            <input type="text" className='form-control' id='name' onChange={this.handleName} />

          </div>
          <div className='form-group mt-2 mb-2'>
            <p>Credit Card</p>
            <input type="number" className='form-control' id='creditCard' onChange={this.handleCredit} />

          </div>
          <div className='form-group mt-2 mb-2'>
            <p>Shipping Address</p>
            <textarea className='form-control' name="shippingAddress" id="shippingAddress" cols="30" rows="10" onChange={this.handleShipping}></textarea>

          </div>
          <div className='row d-flex justify-content-between mt-2 mb-2'>
            <p onClick={() => { this.props.setView('catalog', {}); }}>&lt; Continue Shopping</p>
            <button type='submit' className='btn btn-primary'>Place Order</button>
          </div>
        </form>

      </div>
    );

  }

}
