import React, {Component} from 'react';

class CreateBook extends Component {
  state = {
    name: '',
  }

  handleChange= e => {
    const {type, value, name} = e.target;

    this.setState({
      [name]: value,
    })
  }
  render() {
    return (
      <div className="create-book">
        <form>
          <label htmlFor="name">
            Name
            <input type="text" id="name" placeholder="Enter a Book Name" value={this.state.name} onchange />
          </label>
        </form>
      </div>
    )
  }
}

export default CreateBook;