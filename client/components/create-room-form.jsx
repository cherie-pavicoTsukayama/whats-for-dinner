import React from 'react';
import HostJoinRoom from './host-join-room';

class CreateRoomForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      category: '',
      radius: 0,
      price: 1,
      view: 'form'
    };
    this.handleLocation = this.handleLocation.bind(this);
    this.handleCategory = this.handleCategory.bind(this);
    this.handle$ = this.handle$.bind(this);
    this.handle$$ = this.handle$$.bind(this);
    this.handle$$$ = this.handle$$$.bind(this);
    this.handle$$$$ = this.handle$$$$.bind(this);
    this.onRadioChange = this.onRadioChange.bind(this);
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
    if (this.state.view === 'form') {
      return (
        <div className='container montserrat-400'>
          <form onSubmit={() => { this.props.createRoom(this.state); event.preventDefault(); }}>
            <div className='form-group mt-5 mb-2 d-flex justify-content-center'>

              <input placeholder='location' type="text" className='form-control user-join-input' id='location' onChange={this.handleLocation} />

            </div>
            <div className='form-group mt-5 mb-2'>
              <p className='text-align-center'> Distance(state test): {this.state.radius}</p>
              <div className='d-flex justify-content-center'>
                <label className='mr-3 ml-3 font-weight-bold color' htmlFor="25">1 mi</label>
                <label className='mr-3 ml-3 font-weight-bold color' htmlFor="25">5 mi</label>
                <label className='mr-3 ml-3 font-weight-bold color' htmlFor="25">20 mi</label>
                <label className='mr-3  ml-3 font-weight-bold color' htmlFor="25">any</label>
              </div>
              <div className='d-flex justify-content-center'>
                <div>
                  <input
                    className= 'mr-4 ml-4'
                    type="radio"
                    id='1'
                    name='distance'
                    value={1609}
                    onChange={this.onRadioChange} />
                </div>
                <div>
                  <input
                    className='mr-4 ml-4'
                    type="radio"
                    id='5'
                    name='distance'
                    value={8045}
                    onChange={this.onRadioChange} />
                </div>
                <div>
                  <input
                    className='mr-4 ml-4'
                    type="radio"
                    id='20'
                    name='distance'
                    value={32180}
                    onChange={this.onRadioChange} />
                </div>

                <div>
                  <input
                    className='mr-4 ml-4'
                    type="radio"
                    id='25'
                    name='distance'
                    value={39999}
                    onChange={this.onRadioChange}
                  />
                </div>

              </div>
            </div>
            <div className='form-group mt-2 mb-2'>
              <p className='text-align-center'>Category(state test): {this.state.category}</p>

              <select
                placeholder='Category'
                className='form-control  color'
                name="category"
                id="category"
                onChange={this.handleCategory}>
                <option value="pizza">Pizza</option>
                <option value="mexican">Mexican</option>
                <option value="chinese">Chinese</option>
                <option value="japanese">Japanese</option>
                <option value="korean">Korean</option>
                <option value="indian">Indian</option>
                <option value="thai">Thai</option>
                <option value="burgers">Burgers</option>
                <option value="breakfast">Breakfast</option>
                <option value="pancakes">Pancakes</option>
                <option value="coffee">Coffee</option>
                <option value="bubble tea">Boba</option>
                <option value="icecream">Ice Cream</option>
                <option value="acaibowls">Acai Bowls</option>
                <option value="seafood">Seafood</option>
                <option value="carribean">Carribean</option>
                <option value="italian">Italian</option>
                <option value="greek">Greek</option>
                <option value="french">French</option>
                <option value="spanish">Spanish</option>
                <option value="mediterranean">Mediterranean</option>
              </select>

            </div>
            <div className='form-group mt-4 mb-4'>
              <p>Price(State test):{this.state.price}</p>
              <div className='d-flex justify-content-around'>
                <div className={`price shadow text-align-center ${$1}`} onClick={this.handle$}>$</div>
                <div className={`price shadow text-align-center ${$2}`} onClick={this.handle$$}>$$</div>
                <div className={`price shadow text-align-center ${$3}`} onClick={this.handle$$$}>$$$</div>
                <div className={`price shadow text-align-center ${$4}`} onClick={this.handle$$$$}>$$$$</div>
              </div>

            </div>
            <div className='row d-flex justify-content-center mt-4 mb-2'>
              <button type='submit' className='btn btn-secondary grey-button'>Create Room</button>
            </div>
          </form>

        </div>

      );
    }
    if (this.state.view === 'join') {
      return (
        <div>
          <HostJoinRoom></HostJoinRoom>
        </div>
      );
    }

  }

}

export default CreateRoomForm;
