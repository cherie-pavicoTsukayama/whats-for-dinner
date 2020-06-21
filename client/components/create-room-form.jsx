import React from 'react';
import HostJoinRoom from './host-join-room';

class CreateRoomForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      category: '',
      radius: '',
      price: '',
      view: 'form',
      entryKey: ''
    };
    this.handleLocation = this.handleLocation.bind(this);
    this.handleCategory = this.handleCategory.bind(this);
    this.handle$ = this.handle$.bind(this);
    this.handle$$ = this.handle$$.bind(this);
    this.handle$$$ = this.handle$$$.bind(this);
    this.handle$$$$ = this.handle$$$$.bind(this);
    this.onRadioChange = this.onRadioChange.bind(this);
    this.isCreateRoomButtonDisabled = this.isCreateRoomButtonDisabled.bind(this);
    this.createRoom = this.createRoom.bind(this);
  }

  handleLocation(event) {
    this.setState({ location: event.target.value });
  }

  handleCategory(event) {
    this.setState({ category: event.target.value });
  }

  handle$(event) {
    this.setState({ price: '1' });
  }

  handle$$(event) {
    this.setState({ price: '1,2' });
  }

  handle$$$(event) {
    this.setState({ price: '1,2,3' });
  }

  handle$$$$(event) {
    this.setState({ price: '1,2,3,4' });
  }

  onRadioChange(event) {
    this.setState({ radius: event.target.value });
  }

  isCreateRoomButtonDisabled() {
    if (this.state.radius && this.state.location && this.state.category && this.state.price) {
      return false;
    } else {
      return true;
    }
  }

  createRoom(room) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(room)
    };
    fetch('/api/rooms', options)
      .then(res => res.json())
      .then(json => {
        this.setState({
          entryKey: json.entryKey,
          view: 'join'
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    let $1 = '';
    if (this.state.price === '1') {
      $1 = 'price-selected';
    }
    let $2 = '';
    if (this.state.price === '1,2') {
      $2 = 'price-selected';
    }
    let $3 = '';
    if (this.state.price === '1,2,3') {
      $3 = 'price-selected';
    }
    let $4 = '';
    if (this.state.price === '1,2,3,4') {
      $4 = 'price-selected';
    }
    let mi1 = '';
    if (this.state.radius === '1609') {
      mi1 = 'radius-selected';
    }
    let mi5 = '';
    if (this.state.radius === '8045') {
      mi5 = 'radius-selected';
    }
    let mi20 = '';
    if (this.state.radius === '32180') {
      mi20 = 'radius-selected';
    }
    let miAny = '';
    if (this.state.radius === '39999') {
      miAny = 'radius-selected';
    }
    if (this.state.view === 'form') {
      return (
        <div className='container montserrat-400'>
          <i className="fas fa-2x fa-chevron-left mt-3 grey-color" onClick={() => this.props.setView('landing page')}></i>
          <form onSubmit={() => { this.createRoom(this.state); event.preventDefault(); }}>
            <div className='form-group mt-3 mb-2 d-flex justify-content-center push-down'>
              <i className="fas fa-2x fa-map-marker-alt"></i>
              <input placeholder='City or Zip' type="text" className='form-control user-join-input' id='location' onChange={this.handleLocation} />

            </div>
            <div className='form-group mt-5 mb-2 push-down'>
              <p className='text-align-center'> Distance</p>
              <div className='d-flex justify-content-center'>
                <label className={`mr-3 ml-3 font-weight-bold ${mi1}`} htmlFor="25">1 mi</label>
                <label className={`mr-3 ml-3 font-weight-bold ${mi5}`} htmlFor="25">5 mi</label>
                <label className={`mr-3 ml-3 font-weight-bold ${mi20}`} htmlFor="25">20 mi</label>
                <label className={`mr-3  ml-3 font-weight-bold ${miAny}`} htmlFor="25">any</label>
              </div>
              <div className='d-flex justify-content-center'>
                <div>
                  <input
                    className= 'mr-4 ml-4'
                    type="radio"
                    id='1'
                    name='distance'
                    value='1609'
                    onChange={this.onRadioChange} />
                </div>
                <div>
                  <input
                    className='mr-4 ml-4'
                    type="radio"
                    id='5'
                    name='distance'
                    value='8045'
                    onChange={this.onRadioChange} />
                </div>
                <div>
                  <input
                    className='mr-4 ml-4'
                    type="radio"
                    id='20'
                    name='distance'
                    value='32180'
                    onChange={this.onRadioChange} />
                </div>

                <div>
                  <input
                    className='mr-4 ml-4'
                    type="radio"
                    id='25'
                    name='distance'
                    value='39999'
                    onChange={this.onRadioChange}
                  />
                </div>

              </div>
            </div>
            <div className='form-group mt-5 mb-2 push-down d-flex justify-content-center'>

              <select
                className='form-control  color col-md-5 col-lg-4'
                name="category"
                id="category"
                onChange={this.handleCategory}>
                <option value="">Select a Category</option>
                <option value="pizza">Pizza</option>
                <option value="mexican">Mexican</option>
                <option value="chinese">Chinese</option>
                <option value="japanese">Japanese</option>
                <option value="korean">Korean</option>
                <option value="thai">Thai</option>
                <option value="burgers">Burgers</option>
                <option value="breakfast">Breakfast</option>
                <option value="pancakes">Pancakes</option>
                <option value="coffee">Coffee</option>
                <option value="icecream">Ice Cream</option>
                <option value="acaibowls">Acai Bowls</option>
                <option value="seafood">Seafood</option>
                <option value="italian">Italian</option>
                <option value="greek">Greek</option>
                <option value="french">French</option>
                <option value="spanish">Spanish</option>
                <option value="mediterranean">Mediterranean</option>
              </select>

            </div>
            <div className='form-group mt-4 mb-4 d-flex justify-content-center'>

              <div className='d-flex justify-content-around push-down-more col-md-9 col-lg-6'>
                <div className={`price shadow text-align-center ${$1}`} onClick={this.handle$}>$</div>
                <div className={`price shadow text-align-center ${$2}`} onClick={this.handle$$}>$$</div>
                <div className={`price shadow text-align-center ${$3}`} onClick={this.handle$$$}>$$$</div>
                <div className={`price shadow text-align-center ${$4}`} onClick={this.handle$$$$}>$$$$</div>
              </div>

            </div>
            <div className='row d-flex justify-content-center mt-4 mb-2 push-down-more-more'>
              <button disabled={this.isCreateRoomButtonDisabled()} type='submit' className='btn btn-secondary grey-button shadow'>Create Room</button>
            </div>
          </form>

        </div>

      );
    }
    if (this.state.view === 'join') {
      return (
        <div>
          <HostJoinRoom joinRoom={this.props.joinRoom} entryKey={this.state.entryKey} setView={this.props.setView}></HostJoinRoom>
        </div>
      );
    }
  }
}

export default CreateRoomForm;
